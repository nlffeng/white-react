/**
 * 动态注入 reducer，高阶组件
 */

import React from 'react';
import { ReactReduxContext } from 'react-redux';

export default ({ key, reducer }) => (WrappedComponent) => {
  function ReducerInjector(props) {
    return (
      <ReactReduxContext.Consumer>
        {({ storeState, store }) => {
          // inject reducer
          store.injectReducer(key, reducer);
          return [key] in storeState ? <WrappedComponent {...props} /> : null;
        }}
      </ReactReduxContext.Consumer>
    );
  }

  return ReducerInjector;
};
