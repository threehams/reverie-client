import { applyMiddleware, compose, createStore, Store } from 'redux';
import { ActionMeta } from 'redux-actions';
import thunk from 'redux-thunk';

import { State } from './records';
import { rootReducer } from './rootReducer';

declare var module: { hot: any };

const socketMiddleware = (socket: WebSocket) => {
  return (store: any) => (next: Function) => (action: ActionMeta<any, any>) => {
    if (action.meta && action.meta.socket) {
      socket.send(JSON.stringify(action.payload));
      return next(action);
    }
    next(action);
  };
};

const configureStore = (socket: WebSocket, initialState: State) => {
  const win: any = window;
  const withThunk = applyMiddleware(thunk)(createStore);
  const withSocket = applyMiddleware(socketMiddleware(socket))(withThunk);
  // TODO figure out why this complains about async actions
  // const withDevTools = window.devToolsExtension ? window.devToolsExtension()(withSocket) : withSocket;
  const store: Store<any> = withSocket(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
