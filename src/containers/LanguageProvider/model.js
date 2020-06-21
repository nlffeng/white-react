/**
 * LanguageProvider Reducer
 */

const model = {
  namespace: 'language',
  state: 'zh',
  reducers: {
    changeLocale: (_, locale) => locale,
  },
  effects: {},
};

export default model;
