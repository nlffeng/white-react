/**
 * App.js 应用
 */

import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

import Home from '../Home/Loadable';
import NotFoundPage from '../NotFoundPage';

function App() {
  return (
    <Switch>
      <Redirect exact from="/" to="home" />
      <Route exact path="/home" component={Home} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

const mapStateToProps = state => ({
  app: state.app,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(App);
