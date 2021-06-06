import {
  SET_AUTHENTICATED,
  ADD_COMMAND_HISTORY,
  SET_ANIMATE,
  SET_PATH
} from '../constants/action-types';

const authenticated = window.sessionStorage.getItem("authenticated") === 'true'

const initialState = {
  authenticated,
  name: window.sessionStorage.getItem("name"),
  commandHistory: [],
  animate: true,
  path: authenticated ? '/budget' : '/'
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
  } else if (action.type === SET_PATH) {
    return Object.assign({}, state, {
      path: action.payload
    });
  }
  return state;
};

export default rootReducer;
