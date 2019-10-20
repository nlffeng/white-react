/**
 * 动态注入 saga，高阶组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux';

export default ({ key, saga }) => (WrappedComponent) => {
  class SagaInject extends React.Component {
    static propTypes = {
      store: PropTypes.object.isRequired,
      children: PropTypes.node.isRequired,
    };

    constructor(props) {
      super(props);
      const { store } = props;
      store.injectSaga(key, saga);
    }

    componentWillUnmount() {
      const { store } = this.props;
      store.ejectSaga(key);
    }

    render() {
      return this.props.children;
    }
  }

  return function SagaInjector(props) {
    return (
      <ReactReduxContext.Consumer>
        {({ store }) => {
          return (
            <SagaInject store={store}>
              <WrappedComponent {...props} />
            </SagaInject>
          );
        }}
      </ReactReduxContext.Consumer>
    );
  };
};
