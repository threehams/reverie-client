import { applyMiddleware, compose, createStore, Store } from 'redux';
// tslint:disable-next-line no-var-requires
import thunk from 'redux-thunk';

import { State } from './records';
import { rootReducer } from './rootReducer';

// tslint:disable-next-line no-any
declare var module: { hot: any };

const socketMiddleware = (socket: WebSocket) => {
  // tslint:disable-next-line no-any
  return (store: Store<State>) => (next: Function) => (action: any) => {
    if (action.meta && action.meta.socket) {
      socket.send(JSON.stringify(action.payload));
      return next(action);
    }
    next(action);
  };
};

export const configureStore = (socket: WebSocket, initialState: State) => {
  // tslint:disable-next-line no-any
  const win: any = window;
  const withMiddleware = applyMiddleware(thunk, socketMiddleware(socket))(createStore);
  // TODO figure out why this complains about async actions
  // const withDevTools = window.devToolsExtension ? window.devToolsExtension()(withMiddleware) : withMiddleware;
  const store: Store<State> = withMiddleware(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
