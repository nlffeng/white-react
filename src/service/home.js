import { get } from '../core/request/request';

// 获取用户信息
export const getUserInfo = async () => {
  try {
    return await get('/home/home.json');
  } catch (err) {
    console.error(err);
  }
};
