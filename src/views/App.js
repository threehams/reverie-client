import React from 'react';
import { Provider } from 'react-redux';
import { Map } from 'immutable';

import configureStore from '../configureStore';
import Layout from './Layout';
import socket from '../socket';

import * as initialActions from '../actions/initialActions';
import * as socketActions from '../actions/socketActions';

const store = configureStore(Map());

socket.onopen = function() {
  store.dispatch(socketActions.reconnected());
  socket.send(JSON.stringify({command: 'get initial state'}));
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
  const actionCreator = message.meta.initial ? 'setInitialState' : 'setState';
  store.dispatch(initialActions[actionCreator](message.payload));
};

// Focus on debugger prompt on all keypresses.
// This will have to change once keyboard navigation is set up.
document.onkeypress = function () {
  document.getElementById('prompt').focus();
};

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}

