/**
 * index.js 入口文件
 */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const MOUNT_NODE = document.getElementById('react-root');

ReactDOM.render(
    <App />,
    MOUNT_NODE
);
