import React from 'react';
import { Provider } from 'react-redux';
import { Map } from 'immutable';

import configureStore from '../configureStore';
import Layout from './Layout';
import socket from '../socket';
import attackEnemySuccessFixture from '../fixtures/attack-enemy-success-fixture';
import attackEnemyFailureFixture from '../fixtures/attack-enemy-failure-fixture';
import initialStateFixture from '../fixtures/initial-state-fixture';
import inventoryAddFixture from '../fixtures/inventory-add-fixture';
import inventoryRemoveFixture from '../fixtures/inventory-remove-fixture';
import moveItemToContainerFixture from '../fixtures/move-item-to-container-fixture';
import movePlayerFixture from '../fixtures/move-player-fixture';
import takeItemFromContainerFixture from '../fixtures/take-item-from-container-fixture';
import * as initialActions from '../actions/initial-actions';

const store = configureStore(Map());

// socket.onopen = function() {
//   socket.send('add inventory');
// };
socket.onmessage = function(event) {
  // TODO remove after server always returns JSON
  let diff;
  try {
    diff = JSON.parse(event.data);
  } catch (error) {
    return;
  }
  console.log(diff);
  store.dispatch(initialActions.setState(diff));
};
store.dispatch(initialActions.setState(initialStateFixture));

setTimeout(() => {
  store.dispatch(initialActions.setState(inventoryAddFixture));
}, 500);

setTimeout(() => {
  store.dispatch(initialActions.setState(inventoryRemoveFixture));
}, 1000);

setTimeout(() => {
  store.dispatch(initialActions.setState(moveItemToContainerFixture));
}, 1500);

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

