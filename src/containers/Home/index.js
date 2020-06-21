/**
 * Home(首页)
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useDynamicInject, useModel } from 'white-react-state';
import model from './model';

import './index.scss';

function Home() {
  useDynamicInject(model);

  const [state, dispatchers] = useModel('homeModel');
  const { userInfo } = state;
  const { getUserInfo } = dispatchers || {};

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="app-home-page">
      Home
      <div>userName: {userInfo.userName}</div>
      <div>userId: {userInfo.userId}</div>
    </div>
  );
}

Home.propTypes = {};

Home.defaultProps = {};

export default React.memo(Home);
