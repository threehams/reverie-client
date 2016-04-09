import './style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';

import App from './views/App';
import configureStore from './configureStore';
import socket from './socket';

import * as initialActions from './actions/initialActions';
import * as socketActions from './actions/socketActions';

const store = configureStore(Map());

socket.onopen = function() {
  store.dispatch(socketActions.reconnected());
  socket.send(JSON.stringify({ command: 'get initial state' }));
};

socket.onclose = function() {
  store.dispatch(socketActions.disconnected());
};

/*
 * Standard message structure:
 *
 * {
 *   meta: {
 *     initial: boolean
 *   },
 *   payload: {
 *     // data goes here
 *   }
 * }
 */
socket.onmessage = function(event) {
  // All messages are expected to be valid JSON!
  const message = JSON.parse(event.data);
  if (!message.payload) return;

  // If this is an initial state message, and we're reconnecting, don't apply it.
  // Otherwise, it'll duplicate the location message.
  const actionCreator = message.meta.initial ? initialActions.setInitialState : initialActions.setState;
  store.dispatch(actionCreator(message.payload));
};

// Focus on debugger prompt on all keypresses.
// This will have to change once keyboard navigation is set up.
document.onkeypress = function() {
  document.getElementById('prompt').focus();
};


ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
