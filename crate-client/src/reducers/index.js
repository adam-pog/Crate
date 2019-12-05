import { SET_AUTHENTICATED } from "../constants/action-types";

const initialState = {
  authenticated: window.sessionStorage.getItem("token")
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_AUTHENTICATED) {
    return Object.assign({}, state, {
      authenticated: action.payload
    });
  }
  return state;
};

export default rootReducer;
