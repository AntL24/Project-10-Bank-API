//All reducers will be combined in this file and then imported in store.js
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  dummyReducer: (state = {}) => state,
});

export default rootReducer;
