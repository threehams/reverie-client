import { Action } from 'redux-actions';
import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer';
import { State } from './records';

declare var module: { hot: any };

const socketMiddleware = (socket: WebSocket) => {
  return (store: any) => (next: Function) => (action: Action<any>) => {
    if (action.meta && action.meta.socket) {
      socket.send(JSON.stringify(action.payload));
      return next(action);
    }
    next(action);
  };
};

const configureStore = (socket: WebSocket, initialState: State) => {
  const withMiddleware = applyMiddleware(thunk, socketMiddleware(socket))(createStore);
  const withDevTools = window['devToolsExtension'] ? window['devToolsExtension']()(withMiddleware) : withMiddleware;
  const store: Store<any> = withDevTools(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
