import cookie from 'react-cookies';
import { requestHistory } from '../actionTypes';

const initialState = {
  requests: [],
};

const saveHistory = (history) => {
  cookie.save('history', JSON.stringify(history));
};

const addRequest = (state, action) => {
  if (!action.request.actionName) {
    const newAction = { ...action };
    newAction.request.actionName = action.request.requestJson;
    const newHistory = state.requests;
    newHistory.unshift(action.request);
    saveHistory(newHistory);
    return { requests: newHistory };
  }

  const newHistory = state.requests.filter((request) => {
    if (request.actionName === action.request.actionName) {
      return false;
    }
    return true;
  });

  if (newHistory.length >= 14) {
    newHistory.splice(14, 1);
  }
  newHistory.unshift(action.request);
  saveHistory(newHistory);
  return { requests: newHistory };
};

const deleteRequest = (state, action) => {
  const newHistory = state.requests.filter((request) => {
    if (request.actionName === action.actionName) {
      return false;
    }
    return true;
  });
  saveHistory(newHistory);
  return { requests: newHistory };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case requestHistory.ADD_REQUEST:
      return addRequest(state, action);

    case requestHistory.DELETE_REQUEST:
      return deleteRequest(state, action);

    case requestHistory.SET_HISTORY:
      return { requests: action.history };
    default:
      return state;
  }
};
export default reducer;
