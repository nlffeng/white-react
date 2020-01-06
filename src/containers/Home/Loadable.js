/**
 * Asynchronously loads the component for Home
 */

import loadableComponent from '../../utils/loadableComponent';

export default loadableComponent(
  () => import(/* webpackChunkName: "Home" */'./index.js'),
  'loading...',
);
