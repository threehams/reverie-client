import React from 'react';
import { Provider } from 'react-redux';
import { Map } from 'immutable';

import configureStore from '../configure-store';
import Layout from './Layout';
import socket from '../socket';

import * as initialActions from '../actions/initial-actions';

const store = configureStore(Map());

socket.onmessage = function(event) {
  const diff = JSON.parse(event.data);
  store.dispatch(initialActions.setState(diff));
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

