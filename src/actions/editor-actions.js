import {
  EDITOR_SET_ACTIVE_VIEW,
  EDITOR_REMOVE_VIEW,
  EDITOR_HISTORY_CLEAR
} from './action-types';

export function setActiveView(id) {
  return {
    type: EDITOR_SET_ACTIVE_VIEW,
    payload: {
      id: id
    }
  };
}

export function removeView(id) {
  return {
    type: EDITOR_REMOVE_VIEW,
    payload: {
      id: id
    }
  };
}

export function clear() {
  return {
    type: EDITOR_HISTORY_CLEAR
  };
}
