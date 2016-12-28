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

export const configureStore = (socket: WebSocket, initialState: State) => {
  const win: any = window;
  const withMiddleware = applyMiddleware(thunk, socketMiddleware(socket))(createStore);
  // TODO figure out why this complains about async actions
  // const withDevTools = window.devToolsExtension ? window.devToolsExtension()(withMiddleware) : withMiddleware;
  const store: Store<any> = withMiddleware(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
