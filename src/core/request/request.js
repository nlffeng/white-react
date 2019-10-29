/**
 * axios 工具封装
 */

import axios from 'axios';
import {
  baseURL, timeout, METHODS,
} from './config';

import './interceptors';

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = timeout;
axios.defaults.withCredentials = true;

function buildRequest(method, url, params = {}, options = {}) {
  const args = [];

  if (METHODS[1].includes(method)) {
    args.push({
      ...options,
      params,
    });
  } else if (METHODS[2].includes(method)) {
    args.push(params, options);
  }

  return axios[method](url, ...args);
}

export const get = (url, params, options) => buildRequest('get', url, params, options);

export const post = (url, params, opitons) => buildRequest('post', url, params, opitons);

export const del = (url, params, opitons) => buildRequest('delete', url, params, opitons);

export const put = (url, params, opitons) => buildRequest('put', url, params, opitons);
