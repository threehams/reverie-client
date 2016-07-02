import * as React from 'react';
import { Provider } from 'react-redux';
import * as Html5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Layout from './Layout';

interface AppProps {
  store: any;
}

class BaseApp extends React.Component<AppProps, {}> {
  public render() {
    return (
      <Provider store={this.props.store}>
        <Layout />
      </Provider>
    );
  }
}

const Html5Context = DragDropContext(Html5Backend);
export const App: any = Html5Context(BaseApp);
