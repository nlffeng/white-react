/**
 * 动态注入 saga，高阶组件
 */

import React from 'react';
import store from '../configureStore';

export default ({ key, saga }) => (WrappedComponent) => {
  return class SagaInject extends React.PureComponent {
    constructor(props) {
      super(props);
      store.injectSaga(key, saga);
    }

    componentWillUnmount() {
      store.ejectSaga(key);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};
