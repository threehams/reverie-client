/* eslint-env node */
import path = require('path');
import express = require('express');
import WebSocket = require('ws');
import compression = require('compression');

import config from './config';
import configureStore from './configureStore';
import * as messageActions from './actions/messageActions';
import { State, StateDelta } from './records';
import * as entitySelectors from './selectors/entitySelectors';

const app = express();

// TODO https://github.com/glenjamin/ultimate-hot-reloading-example/blob/master/server.js
if (!config.development) {
  app.use(compression());
  app.use('/build', express.static(path.join(__dirname, '..', 'build')));
  app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

  app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
  });
}

const PORT = config.port || 3000;

const server = app.listen(PORT, function(err: Error) {
  if (err) {
    // tslint:disable
    console.log(err);
    // tslint:enable
    return;
  }

  // tslint:disable
  console.log('Listening at http://localhost, port', PORT);
  // tslint:eisable

});

interface MessageOptions {
  initial?: boolean;
};

interface Message {
  payload?: {
    command?: string;
  };
};

const webSocketServer = new WebSocket.Server({ server });
const store = configureStore();

webSocketServer.on('connection', function(ws) {
  let currentState: State;
  const userId = '1';
  const locationId = '2';

  const unsubscribe = store.subscribe(function() {
    const newState = <State>store.getState();
    const diff = entitySelectors.diff(newState, currentState);
    const relevant = diff.filter(entity => entity.owner === userId || entity.owner === locationId);
    if (relevant.size) {
      sendMessage(ws, new StateDelta({
        entities: diff
      }));
    }
    currentState = newState;
  });

  ws.on('message', (message) => {
    const command = parseMessage(message);
    (<any> store).dispatch(messageActions.parseCommand(command, userId));
  });

  ws.on('close', function() {
    currentState = null;
    unsubscribe();
  });
});

function select(state) {
  return state.entities;
}

function parseMessage(jsonMessage: string): string | null {
  try {
    const message: Message = JSON.parse(jsonMessage);
    return message.payload.command;
  } catch(e) {
    return null;
  }
}

function sendMessage(socket, stateDelta: StateDelta, options?: MessageOptions) {
  socket.send(JSON.stringify({
    meta: options.initial ? { initial: true } : null,
    payload: stateDelta,
  }))
}
