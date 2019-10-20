/**
 * Home(首页)
 */

import React from 'react';
// import PropTypes from 'prop-types';
import './index.scss';

function Home(props) {
  return (
    <div className="app-home-page">
      Home
    </div>
  );
}

Home.propTypes = {};

Home.defaultProps = {};

export default React.memo(Home);
