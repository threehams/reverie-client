/* eslint-env node */
import path from 'path';
import express from 'express';
import webpack from 'webpack';

import config from './serverConfig';
import WebSocket from 'ws';

import fixtureInitialState from './fixtures/fixtureInitialState';
import fixtureInventoryAdd from './fixtures/fixtureInventoryAdd';
import fixtureInventoryRemove from './fixtures/fixtureInventoryRemove';
import fixtureAttackEnemySuccess from './fixtures/fixtureAttackEnemySuccess';
import fixtureAttackEnemyFailure from './fixtures/fixtureAttackEnemyFailure';
import fixtureMovePlayer from './fixtures/fixtureMovePlayer';
import fixtureMovePlayerBack from './fixtures/fixtureMovePlayerBack';
import fixtureMoveItemToContainer from './fixtures/fixtureMoveItemToContainer';
import compression from 'compression';

const webpackConfig = require('../webpack.config');

const app = express();

if (config.development) {
  const compiler = webpack(webpackConfig);
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(compression());
  app.use('/dist', express.static(path.join( __dirname, '..', 'dist')));
}

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(config.port || 8080, function(err) {
  if (err) {
    console.log(err); //eslint-disable-line no-console
    return;
  }

  console.log('Listening at http://localhost, port', config.port); //eslint-disable-line no-console
});

const wsServer = new WebSocket.Server({ server });
wsServer.on('connection', function(ws) {
  function sendMessage(message, opts = {}) {
    ws.send(JSON.stringify({
      payload: message,
      meta: {
        initial: opts.initial
      }
    }));
  }

  sendMessage();

  // Canned responses!
  // See expected meta/payload message structure in views/App.js
  // Follow Flux Standard Action, minus 'type'
  ws.on('message', (json) => {
    const message = JSON.parse(json);
    switch (message.command.toLowerCase()) {
      case 'get initial state':
        return sendMessage(fixtureInitialState, {initial: true});
      case 'attack hiro':
        return sendMessage(fixtureAttackEnemySuccess);
      case 'attack raven':
        return sendMessage(fixtureAttackEnemyFailure);
      case 'move readme.txt to usb-drive':
        return sendMessage(fixtureMoveItemToContainer);
      case 'n':
      case 'north':
        return sendMessage(fixtureMovePlayer);
      case 's':
      case 'south':
        return sendMessage(fixtureMovePlayerBack);
      case 'help':
        return sendMessage({
          message: `Available commands:
            attack hiro
            attack raven
            move readme.txt to usb-drive
            north || n
            run tmp
            take tmp`
        });
      case 'run tmp':
        return sendMessage(fixtureInventoryRemove);
      case 'take tmp':
        return sendMessage(fixtureInventoryAdd);
      default:
        return sendMessage({ message: `I don't know how to ${message.command}.`});
    }
  });
});
