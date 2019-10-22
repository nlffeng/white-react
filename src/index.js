/**
 * index.js 入口文件
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './configureStore';

import LanguageProvider from './containers/LanguageProvider';

import './index.scss';

import App from './containers/App';

const MOUNT_NODE = document.getElementById('react-root');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider>
        <Router>
          <App />
        </Router>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

// Intl polyfill
if (window.Intl) {
  import('intl').then(() => {
    return import('intl/locale-data/jsonp/en.js');
  }).then(() => {
    render();
  }).catch((e) => {
    throw e;
  });
} else {
  render();
}
