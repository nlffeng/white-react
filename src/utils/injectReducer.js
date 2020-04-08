/**
 * 动态注入 reducer，高阶组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux';

export default ({ key, reducer }) => (WrappedComponent) => {
  class ReducerInject extends React.Component {
    static propTypes = {
      store: PropTypes.object.isRequired,
      children: PropTypes.element,
    };

    constructor(props) {
      super(props);
      const { store } = props;
      store.injectReducer(key, reducer);
    }

    render() {
      return this.props.children;
    }
  }

  function ReducerInjector(props) {
    return (
      <ReactReduxContext.Consumer>
        {({ store }) => {
          return (
            <ReducerInject store={store}>
              <WrappedComponent {...props} />
            </ReducerInject>
          );
        }}
      </ReactReduxContext.Consumer>
    );
  }

  return ReducerInjector;
};
