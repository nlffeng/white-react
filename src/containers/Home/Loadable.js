/**
 * Asynchronously loads the component for Home
 */

import loadable from '@loadable/component';

export default loadable(() => import(/* webpackChunkName: "Home" */'./index.js'), {
  fallback: 'loading...',
});
