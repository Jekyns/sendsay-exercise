import { user } from '../actionTypes';

const initialState = {
  user: {
    login: '',
    sublogin: '',
  },
};

const deleteUser = (state) => {
  const newUser = initialState;
  return {
    ...state,
    user: newUser,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case user.SET_USER:
      return {
        ...state,
        user: { ...state.user, ...action.user },
      };

    case user.DELETE_USER:
      return deleteUser(state, action);
    default:
      return state;
  }
};
export default reducer;
