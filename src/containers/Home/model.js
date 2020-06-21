import { getUserInfo } from '../../service/home';

const model = {
  namespace: 'homeModel',
  state: {
    userInfo: {},
  },
  reducers: {
    setUserInfo: (state, payload) => ({
      ...state,
      userInfo: payload,
    }),
  },
  effects: {
    async getUserInfo() {
      const res = await getUserInfo();

      if (res.code === 200) {
        this.setUserInfo(res.data || {});
      }
    },
  },
};

export default model;
