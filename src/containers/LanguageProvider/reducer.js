/**
 * LanguageProvider Reducer
 */

import {
  CHANGE_LOCALE,
} from './constants';

const initialSate = {
  locale: 'zh',
};

export default function reducer(state = initialSate, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        ...state,
        locale: action.locale,
      };
    default:
      return state;
  }
}
