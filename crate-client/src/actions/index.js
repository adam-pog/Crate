import { SET_AUTHENTICATED } from "../constants/action-types";

export function setAuthenticated(payload) {
  return { type: SET_AUTHENTICATED, payload }
};
