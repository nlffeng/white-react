/**
 * Home(首页)
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { getUserInfo } from '../../service/home';

import './index.scss';

function Home(props) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo().then((res) => {
      setUserInfo(res.data);
    });
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
