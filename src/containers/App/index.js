/**
 * App.js 应用
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDynamicInject } from 'white-react-state';

import model from './model';

import Home from '../Home/Loadable';
import NotFoundPage from '../NotFoundPage';

export function App() {
  useDynamicInject(model);

  return (
    <Switch>
      <Redirect exact from="/" to="home" />
      <Route exact path="/home" component={Home} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default App;
