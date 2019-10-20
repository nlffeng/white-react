/**
 * reducer
 */

import {
  LOADING,
} from './constants';

const initialState = {
  loading: false,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}
