import { applyMiddleware, compose, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './rootReducer';

export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(promiseMiddleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
