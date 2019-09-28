/**
 * index.js 入口文件
 */

import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import App from './containers/App';

const MOUNT_NODE = document.getElementById('react-root');

const render = () => {
  ReactDOM.render(
    <App />,
    MOUNT_NODE
  );
};

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
