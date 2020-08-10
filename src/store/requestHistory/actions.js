import { requestHistory } from '../actionTypes';

export function addRequest(request) {
  return {
    type: requestHistory.ADD_REQUEST,
    request,
  };
}
export function deleteRequest(actionName) {
  return {
    type: requestHistory.DELETE_REQUEST,
    actionName,
  };
}
export function setHistory(history) {
  return {
    type: requestHistory.SET_HISTORY,
    history,
  };
}
