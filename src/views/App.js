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

socket.onmessage = function(event) {
  const diff = JSON.parse(event.data);
  store.dispatch(initialActions.setInitialState(diff));
};

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

