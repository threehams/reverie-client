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
import fixtureAttackBees from './fixtures/fixtureAttackBees';
import fixtureAttackedByBees from './fixtures/fixtureAttackedByBees';
import fixtureBeesPanic from './fixtures/fixtureBeesPanic';
import fixtureBeesGone from './fixtures/fixtureBeesGone';
import fixtureBeesPanicGone from './fixtures/fixtureBeesPanicGone';
import fixtureAttackEnemyFailure from './fixtures/fixtureAttackEnemyFailure';
import fixtureEnemyAttack from './fixtures/fixtureEnemyAttack';
import fixtureMovePlayer from './fixtures/fixtureMovePlayer';
import fixtureMovePlayerBack from './fixtures/fixtureMovePlayerBack';
import fixtureMoveItemToContainer from './fixtures/fixtureMoveItemToContainer';
import fixtureNotOnFire from './fixtures/fixtureNotOnFire';
import fixtureNotConfused from './fixtures/fixtureNotConfused';
import fixtureNotPanicking from './fixtures/fixtureNotPanicking';
import fixtureOpenContainer from './fixtures/fixtureOpenContainer';
import fixtureOpenUnlockedContainer from './fixtures/fixtureOpenUnlockedContainer';
import fixtureOtherPlayerSay from './fixtures/fixtureOtherPlayerSay';
import fixturePanicking from './fixtures/fixturePanicking';
import fixturePlayerSay from './fixtures/fixturePlayerSay';
import fixtureUnlockContainer from './fixtures/fixtureUnlockContainer';
import compression from 'compression';

const webpackConfig = require('../webpack.config');

const app = express();

if (config.development) {
  const compiler = webpack(webpackConfig);
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
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

  sendMessage(fixtureInitialState, {initial: true});

  // Canned responses!
  // See expected meta/payload message structure in views/App.js
  // Follow Flux Standard Action, minus 'type'
  ws.on('message', (json) => {
    const command = JSON.parse(json).command.trim();
    switch (command.toLowerCase().trim()) {
      case 'attack hiro':
        sendMessage(fixtureAttackEnemySuccess);
        return setTimeout(() => {
          sendMessage(fixtureEnemyAttack);
          setTimeout(() => {
            sendMessage(fixtureNotConfused);
          }, 15000);
        }, 2000);
      case 'attack raven':
        sendMessage(fixtureAttackEnemyFailure);
        return setTimeout(() => {
          sendMessage(fixturePanicking);
          setTimeout(() => {
            sendMessage(fixtureNotOnFire);
            setTimeout(() => {
              sendMessage(fixtureNotPanicking);
            }, 10000);
          }, 10000);
        }, 5000);
      case 'attack bees':
        sendMessage(fixtureAttackBees);
        return setTimeout(() => {
          sendMessage(fixtureAttackedByBees);
          setTimeout(() => {
            sendMessage(fixtureBeesPanic);
            setTimeout(() => {
              sendMessage(fixtureBeesGone);
              setTimeout(() => {
                sendMessage(fixtureBeesPanicGone);
              }, 15000);
            }, 15000);
          }, 5000);
        }, 3000);
      case 'transfer self/docs/readme.txt to floor/usb-drive':
        return sendMessage(fixtureMoveItemToContainer);
      case 'n':
      case 'north':
        return sendMessage(fixtureMovePlayer);
      case 's':
      case 'south':
        return sendMessage(fixtureMovePlayerBack);
      case 'open floor/small-mailbox':
        return sendMessage(fixtureOpenContainer);
      case 'open floor/usb-drive':
        return sendMessage(fixtureOpenUnlockedContainer);
      case 'help':
        return sendMessage({
          message: `Available commands:
            attack hiro
            attack raven
            transfer readme.txt to usb-drive
            north || n
            run tmp
            take tmp
            say something`
        });
      case 'run tmp':
        return sendMessage(fixtureInventoryRemove);
      case 'say something':
        sendMessage(fixturePlayerSay);
        return setTimeout(() => {
          sendMessage(fixtureOtherPlayerSay);
        }, 1000);
      case 'take tmp':
        return sendMessage(fixtureInventoryAdd);
      case 'unlock floor/usb-drive':
        return sendMessage(fixtureUnlockContainer);
      default:
        return sendMessage({ message: `I don't know how to ${command}.`});
    }
  });
});
