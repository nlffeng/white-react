/**
 * loadableComponent(动态加载组件)
 */

import React from 'react';

export default function loadableComponent(lazyFunc, fallback) {
  // 该组件是动态加载的
  const LazyComponent = React.lazy(lazyFunc);

  const suspense = () => (
    <React.Suspense fallback={fallback}>
      <LazyComponent />
    </React.Suspense>
  );

  return suspense;
}
