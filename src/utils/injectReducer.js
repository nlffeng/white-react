/**
 * 动态注入 reducer
 */

import store from '../configureStore';

export default ({ key, reducer }) => (WrappedComponent) => {
  store.injectReducer(key, reducer);
  return WrappedComponent;
};
