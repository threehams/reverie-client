/* eslint-env node */
import path = require('path');
import express = require('express');
import webpack = require('webpack');
import WebSocket = require('ws');
import compression = require('compression');
import webpackConfig from '../webpack.config';
import webpackDevMiddleware = require('webpack-dev-middleware');
import webpackHotMiddleware = require('webpack-hot-middleware');

import config from './config';
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

const app = express();

if (config.development) {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { chunks: false },
  }));
  app.use('/assets', express.static(path.join( __dirname, '..', 'assets')));

  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(compression());
  app.use('/dist', express.static(path.join( __dirname, '..', 'dist')));
  app.use('/assets', express.static(path.join( __dirname, '..', 'assets')));
}

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(config.port || 8080, function(err: Error) {
  if (err) {
    // tslint:disable
    console.log(err);
    // tslint:enable
    return;
  }

  // tslint:disable
  console.log('Listening at http://localhost, port', config.port);
  // tslint:eisable

});

// const getInitialState = () => { // eslint-disable-line no-unused-vars
//   const itemCount = 1000;
//   const ids = Array.from(new Array(itemCount).keys()).map(i => (i + itemCount).toString());
//   return {
//     ...fixtureInitialState,
//     entities: {
//       ...fixtureInitialState.entities,
//       ...ids.reduce((result, id) => {
//         result[id] = {
//           id,
//           name: `item-#${id}`,
//           components: ['item'],
//         };
//         return result;
//       }, {}),
//       [9]: {
//         ...fixtureInitialState.entities[9],
//         entities: [...fixtureInitialState.entities[9].entities, ...ids]
//       }
//     }
//   };
// };

interface MessageOptions {
  initial?: boolean;
}

interface Message {
  
}

const wsServer = new WebSocket.Server({ server });
wsServer.on('connection', function(ws) {
  const sendMessage = (message: Message, opts: MessageOptions = {}) => {
    ws.send(JSON.stringify({
      payload: message,
      meta: {
        initial: opts.initial
      }
    }));
  };

  // Uncomment for performance testing against lots of items.
  // sendMessage(getInitialState(), {initial: true});
  sendMessage(fixtureInitialState, {initial: true});

  // Canned responses!
  // See expected meta/payload message structure in views/App.js
  // Follow Flux Standard Action, minus 'type'
  // Don't care about complexity here, it's all going away!
  ws.on('message', (json) => { // eslint-disable-line complexity
    const command = JSON.parse(json).command.trim();
    switch (command.toLowerCase().trim()) {
      case 'attack hiro':
      case 'kill hiro':
        sendMessage(fixtureAttackEnemySuccess);
        return setTimeout(() => {
          sendMessage(fixtureEnemyAttack);
          setTimeout(() => {
            sendMessage(fixtureNotConfused);
          }, 15000);
        }, 2000);
      case 'attack raven':
      case 'kill raven':
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
      case 'kill bees':
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
      case 'transfer readme.txt to hacks':
      case 'transfer self/docs/readme.txt to self/hacks':
        return sendMessage(fixtureMoveItemToContainer);
      case 'n':
      case 'north':
      case 'walk n':
      case 'walk north':
      case 'run':
        return sendMessage(fixtureMovePlayer);
      case 's':
      case 'south':
      case 'walk s':
      case 'walk south':
        return sendMessage(fixtureMovePlayerBack);
      case 'open small-mailbox':
      case 'open floor/small-mailbox':
        return sendMessage(fixtureOpenContainer);
      case 'open usb-drive':
      case 'open floor/usb-drive':
        return sendMessage(fixtureOpenUnlockedContainer);
      case 'help':
        return sendMessage({
          message: `Available commands:
            attack hiro
            attack raven
            attack bees
            transfer self/docs/readme.txt to self/hacks
            n
            north
            s
            south
            use tmp
            take tmp
            say something`
        });
      case 'use tmp':
        return sendMessage(fixtureInventoryRemove);
      case 'say something':
        sendMessage(fixturePlayerSay);
        return setTimeout(() => {
          sendMessage(fixtureOtherPlayerSay);
        }, 1000);
      case 'take tmp':
        return sendMessage(fixtureInventoryAdd);
      case 'unlock usb-drive':
      case 'unlock floor/usb-drive':
        return sendMessage(fixtureUnlockContainer);
      default:
        return sendMessage({ message: `I don't know how to ${command}.`});
    }
  });
});
