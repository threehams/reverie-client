/* eslint-env node */
import path from 'path';
import express from 'express';
import webpack from 'webpack';

import webpackConfig from '../webpack.config';
import config from './server-config';
import WebSocket from 'ws';

import fixtureInitialState from './fixtures/initial-state-fixture';
import fixtureInventoryAdd from './fixtures/inventory-add-fixture';
import fixtureInventoryRemove from './fixtures/inventory-remove-fixture';
import fixtureAttackEnemySuccess from './fixtures/attack-enemy-success-fixture';
import fixtureAttackEnemyFailure from './fixtures/attack-enemy-failure-fixture';
import fixtureMovePlayer from './fixtures/move-player-fixture';
import fixtureMovePlayerBack from './fixtures/move-player-back-fixture';
import fixtureMoveItemToContainer from './fixtures/move-item-to-container-fixture';

const app = express();
const compiler = webpack(webpackConfig);

if (config.development) {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));
} else {
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
  function sendMessage(message) {
    ws.send(JSON.stringify(message));
  }

  ws.send(
    JSON.stringify(fixtureInitialState)
  );

  ws.on('message', function(json) {
    const message = JSON.parse(json);
    switch (message.command.toLowerCase()) {
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
        return sendMessage({
          message: `I don't know how to ${message.command}.`
        });
    }
  });
});

