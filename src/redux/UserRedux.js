/**
 * Created by InspireUI on 14/02/2017.
 */

const types = {
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN_SUCCESS',
};

export const actions = {
  login: (user, token) => {
    return {type: types.LOGIN, user, token};
  },
  logout(){
    return {type: types.LOGOUT};
  },
};

const initialState = {
  user: null,
  token: null
};

export const reducer = (state = initialState, action) => {
  const {type, user, token} = action;
  switch (type) {
    case types.LOGOUT:
      return Object.assign({}, initialState);
    case types.LOGIN:
      return {...state, user, token};
    default:
      return state;
  }
};