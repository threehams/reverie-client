import React from 'react';
import { Provider } from 'react-redux';
import { Map } from 'immutable';

import configureStore from '../configureStore';
import Layout from './Layout';

const store = configureStore(Map());

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}

