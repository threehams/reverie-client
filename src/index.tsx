import './style.css';

// Import only needed polyfills - saves lots of space and bundling time
import './polyfills';

import * as React from 'react';
import { render } from 'react-dom';

import { App } from './views/App';
import configureStore from './configureStore';
import socket from './socket';
import { AppContainer } from 'react-hot-loader';

import * as messageActions from './actions/messageActions';
import * as socketActions from './actions/socketActions';

const store = configureStore(socket, undefined);

socket.onopen = function() {
  store.dispatch(socketActions.reconnected());
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
  if (!message.payload) {
    return;
  }

  // If this is an initial state message, and we're reconnecting, don't apply it.
  // Otherwise, it'll duplicate the location message.
  let action;
  if (message.meta.initial) {
    action = messageActions.setInitialState(message.payload);
  } else {
    action = messageActions.setState(message.payload);
  }
  store.dispatch(action);
};

// Focus on terminal prompt on all keypresses.
// This will have to change once keyboard navigation is set up.
document.onkeypress = function() {
  document.getElementById('prompt').focus();
};

render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  document.getElementById('root')
);

declare var module: { hot: any };

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const App = require('./views/App').App;
    render(
      <AppContainer>
        <App store={store} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
