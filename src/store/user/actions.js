import { user } from '../actionTypes';

export function setUser(profile) {
  return {
    type: user.SET_USER,
    user: profile,
  };
}
export function deleteUser(profile) {
  return {
    type: user.DELETE_USER,
    user: profile,
  };
}