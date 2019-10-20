/**
 * NotFoundPage(找不到页面)
 */

import React from 'react';
import './index.scss';

export default function NotFoundPage() {
  return (
    <div className="app-not-found-page">
      <div className="code">404</div>
      <p className="message">抱歉，找不到页面</p>
    </div>
  );
}
