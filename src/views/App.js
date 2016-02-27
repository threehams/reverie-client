import React from 'react';
import { Provider } from 'react-redux';
import { Map, fromJS } from 'immutable';

import * as actions from '../actions/initial-actions';
import fixture from '../fixtures/fixture';
import configureStore from '../configureStore';
import Inventory from './Inventory';
import Editor from './Editor';
import Debugger from './Debugger';

const store = configureStore(Map());
store.dispatch(actions.setState(fromJS(fixture)));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Inventory />
          <Editor />
          <Debugger />
        </div>
      </Provider>
    );
  }
}
