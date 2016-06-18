import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer';

const configureStore = (initialState) => {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    // eslint-disable-next-line no-undef, no-process-env
    window.devToolsExtension && process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f
  )(createStore);
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
