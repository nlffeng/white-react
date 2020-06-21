/**
 * reducer
 */

const model = {
  namespace: 'app',
  state: {
    loading: false,
  },
  reducers: {
    setLoading: (state, payload) => ({
      ...state,
      loading: payload,
    }),
  },
  effects: {},
};

export default model;
