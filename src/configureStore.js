/**
 * 创建 store
 */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

function configureStore(preloadedState) {
  const middlewares = [sagaMiddleware];

  const composeEnhancers = process.env.NODE_ENV === 'development' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      shouldHotReload: false,
    }) : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
    // other store enhancers if any
  );

  const store = createStore(
    createReducer(),
    preloadedState,
    enhancer,
  );

  store.runSaga = sagaMiddleware.run;
  // Add a dictionary to keep track of the injected reducers and the injected sagas
  store.injectedSagas = {};
  store.injectedReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(createReducer(store.injectedReducers)));
  }

  return store;
}

const initialState = {};
const store = configureStore(initialState);

// Create an inject reducer function
// This function adds the reducer, and creates a new comnined reducer
store.injectReducer = (key, reducer) => {
  if (!(key && typeof key === 'string')) {
    console.error('injectReducer: Expected `key` to be a string');
    return;
  }
  if (typeof reducer !== 'function') {
    console.error('injectReducer: Expected `reducer` to be a reducer function');
    return;
  }

  // Check `store.injectedReducers[key] === reducer`
  // for hot reloading when a key is the same nut a reducer is different
  if (key in store.injectedReducers && store.injectedReducers[key] === reducer) return;

  store.injectedReducers[key] = reducer;
  store.replaceReducer(createReducer(store.injectedReducers));
};

// Create an inject saga function
store.injectSaga = (key, saga, args) => {
  if (!(key && typeof key === 'string')) {
    console.error('injectSaga: Expected `key` to be a string');
    return;
  }
  if (typeof saga !== 'function') {
    console.error('injectSaga: Expected `saga` to be a saga function');
    return;
  }

  const sagaTarget = store.injectedSagas[key];
  // same saga
  if (sagaTarget && sagaTarget.saga === saga) return;

  if (sagaTarget && sagaTarget.task && sagaTarget.task.cancel) {
    sagaTarget.task.cancel();
  }

  store.injectedSagas[key] = { saga, task: store.runSaga(saga, args) };
};

// Create an eject saga function
store.ejectSaga = (key) => {
  if ([key] in store.injectedSagas) {
    const sagaTarget = store.injectedSagas[key];
    if (sagaTarget && sagaTarget.task && sagaTarget.task.cancel) {
      sagaTarget.task.cancel();
      store.injectedSagas[key] = null;
    }
  }
};

export default store;
