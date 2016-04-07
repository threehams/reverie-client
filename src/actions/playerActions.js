import {
  PLAYER_SET_ACTIVE_VIEW
} from './actionTypes';

export function setActiveView(name) {
  return {
    type: PLAYER_SET_ACTIVE_VIEW,
    payload: {
      name: name
    }
  };
}
