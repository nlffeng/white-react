/**
 * axios interceptors(拦截器)
 */

import axios from 'axios';

axios.interceptors.request.use((config) => {
  // Do something before request is <sent></sent>
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  const res = response.data;

  // do something...
  // if (res.code === 200) {}

  return res;
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
