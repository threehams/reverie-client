import path = require('path');
import express = require('express');
import WebSocket = require('ws');
import compression = require('compression');

import * as messageActions from './actions/messageActions';
import config from './config';
import configureStore from './configureStore';
import { State, StateDelta } from './records';

import fixtureAttackBees from './fixtures/fixtureAttackBees';
import fixtureAttackedByBees from './fixtures/fixtureAttackedByBees';
import fixtureAttackEnemyFailure from './fixtures/fixtureAttackEnemyFailure';
import fixtureAttackEnemySuccess from './fixtures/fixtureAttackEnemySuccess';
import fixtureBeesGone from './fixtures/fixtureBeesGone';
import fixtureBeesPanic from './fixtures/fixtureBeesPanic';
import fixtureBeesPanicGone from './fixtures/fixtureBeesPanicGone';
import fixtureEnemyAttack from './fixtures/fixtureEnemyAttack';
import fixtureInitialState from './fixtures/fixtureInitialState';
import fixtureInventoryAdd from './fixtures/fixtureInventoryAdd';
import fixtureInventoryRemove from './fixtures/fixtureInventoryRemove';
import fixtureMoveItemToContainer from './fixtures/fixtureMoveItemToContainer';
import fixtureMovePlayer from './fixtures/fixtureMovePlayer';
import fixtureMovePlayerBack from './fixtures/fixtureMovePlayerBack';
import fixtureNotConfused from './fixtures/fixtureNotConfused';
import fixtureNotOnFire from './fixtures/fixtureNotOnFire';
import fixtureNotPanicking from './fixtures/fixtureNotPanicking';
import fixtureOpenContainer from './fixtures/fixtureOpenContainer';
import fixtureOpenUnlockedContainer from './fixtures/fixtureOpenUnlockedContainer';
import fixtureOtherPlayerSay from './fixtures/fixtureOtherPlayerSay';
import fixturePanicking from './fixtures/fixturePanicking';
import fixturePlayerSay from './fixtures/fixturePlayerSay';
import fixtureUnlockContainer from './fixtures/fixtureUnlockContainer';

const app = express();

if (!config.development) {
  app.use(compression());
  app.use('/build', express.static(path.join( __dirname, '..', 'build')));
  app.use('/assets', express.static(path.join( __dirname, '..', 'assets')));

  app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
  });
}

const PORT = config.port || 3000;

const server = app.listen(PORT, (err: Error) => {
  if (err) {
    // tslint:disable-next-line no-console
    console.log(err);
    return;
  }

  // tslint:disable-next-line no-console
  console.log('Listening at http://localhost, port', PORT);
});

interface MessageOptions {
  initial?: boolean;
}

interface Message {
  payload?: {
    command?: string;
  };
}

const webSocketServer = new WebSocket.Server({ server });
const store = configureStore();

webSocketServer.on('connection', (webSocket) => {
  sendMessage(webSocket, fixtureInitialState, {initial: true});
  const playerId = '1';

  // Canned responses!
  // See expected meta/payload message structure in views/App.js
  // Follow Flux Standard Action, minus 'type'
  // Don't care about complexity here, it's all going away!
  webSocket.on('message', (json) => {
    const command: string = JSON.parse(json).command.trim();
    switch (command.toLowerCase().trim()) {
      case 'attack hiro':
      case 'kill hiro':
        sendMessage(webSocket, fixtureAttackEnemySuccess);
        return setTimeout(() => {
          sendMessage(webSocket, fixtureEnemyAttack);
          setTimeout(() => {
            sendMessage(webSocket, fixtureNotConfused);
          }, 15000);
        }, 2000);
      case 'attack raven':
      case 'kill raven':
        sendMessage(webSocket, fixtureAttackEnemyFailure);
        return setTimeout(() => {
          sendMessage(webSocket, fixturePanicking);
          setTimeout(() => {
            sendMessage(webSocket, fixtureNotOnFire);
            setTimeout(() => {
              sendMessage(webSocket, fixtureNotPanicking);
            }, 10000);
          }, 10000);
        }, 5000);
      case 'attack bees':
      case 'kill bees':
        sendMessage(webSocket, fixtureAttackBees);
        return setTimeout(() => {
          sendMessage(webSocket, fixtureAttackedByBees);
          setTimeout(() => {
            sendMessage(webSocket, fixtureBeesPanic);
            setTimeout(() => {
              sendMessage(webSocket, fixtureBeesGone);
              setTimeout(() => {
                sendMessage(webSocket, fixtureBeesPanicGone);
              }, 15000);
            }, 15000);
          }, 5000);
        }, 3000);
      // case 'transfer readme.txt to hacks':
      // case 'transfer self/docs/readme.txt to self/hacks':
      //   return sendMessage(webSocket, fixtureMoveItemToContainer);
      case 'n':
      case 'north':
      case 'walk n':
      case 'walk north':
      case 'run':
        return sendMessage(webSocket, fixtureMovePlayer);
      case 's':
      case 'south':
      case 'walk s':
      case 'walk south':
        return sendMessage(webSocket, fixtureMovePlayerBack);
      case 'open small-mailbox':
      case 'open floor/small-mailbox':
        return sendMessage(webSocket, fixtureOpenContainer);
      case 'open usb-drive':
      case 'open floor/usb-drive':
        return sendMessage(webSocket, fixtureOpenUnlockedContainer);
      case 'help':
        return sendMessage(webSocket, {
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
            say something`,
        });
      case 'use tmp':
        return sendMessage(webSocket, fixtureInventoryRemove);
      case 'say something':
        sendMessage(webSocket, fixturePlayerSay);
        return setTimeout(() => {
          sendMessage(webSocket, fixtureOtherPlayerSay);
        }, 1000);
      case 'take tmp':
        return sendMessage(webSocket, fixtureInventoryAdd);
      case 'unlock usb-drive':
      case 'unlock floor/usb-drive':
        return sendMessage(webSocket, fixtureUnlockContainer);
      default:
        return sendMessage(webSocket, { message: `I don't know how to ${command}.`});
    }
  });
});

function parseMessage(jsonMessage: string): string | null {
  try {
    const message: Message = JSON.parse(jsonMessage);
    return message.payload.command;
  } catch (err) {
    return null;
  }
}

// TODO reconcile immutable message with JS fixtures
function sendMessage(webSocket: WebSocket, delta: any, opts: MessageOptions = {}) {
  webSocket.send(JSON.stringify({
    meta: {
      initial: opts.initial,
    },
    payload: delta,
  }));
};
