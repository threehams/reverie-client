import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import Html5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Layout from './Layout';

class App extends React.Component {
  static propTypes = {
    store: PropTypes.any // how do I test for a Redux store?
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <Layout />
      </Provider>
    );
  }
}

export default DragDropContext(Html5Backend)(App);
