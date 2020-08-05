import { combineReducers } from 'redux';

import userStore from './user/reducer';
import historyStore from './requestHistory/reducer';

const rootReducer = combineReducers({
  userStore,
  historyStore,
});

export default rootReducer;
