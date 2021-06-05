import {
  SET_AUTHENTICATED,
  ADD_COMMAND_HISTORY,
  SET_ANIMATE
} from '../constants/action-types';

const initialState = {
  authenticated: window.sessionStorage.getItem("authenticated") === 'true',
  name: window.sessionStorage.getItem("name"),
  commandHistory: [],
  animate: true
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_AUTHENTICATED) {
    window.sessionStorage.setItem("authenticated", action.payload.authenticated);
    window.sessionStorage.setItem("name", action.payload.name);
    return Object.assign({}, state, {
      authenticated: action.payload.authenticated,
      name: action.payload.name
    });
  } else if (action.type === ADD_COMMAND_HISTORY) {
    return Object.assign({}, state, {
      commandHistory: state.commandHistory.concat(action.payload)
    });
  } else if (action.type === SET_ANIMATE) {
    return Object.assign({}, state, {
      animate: action.payload
    });
  }
  return state;
};

export default rootReducer;
