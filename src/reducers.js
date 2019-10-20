/**
 * 混合所有的 reducer
 */

import { combineReducers } from 'redux';

const initialReducer = (state = {}) => state;

function createReducer(injectedReducers) {
  return combineReducers({
    initialState: initialReducer,
    ...injectedReducers,
  });
}

export default createReducer;
