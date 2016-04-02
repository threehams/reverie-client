import {
  EDITOR_ADD_VIEW,
  EDITOR_SET_ACTIVE_VIEW,
  EDITOR_REMOVE_VIEW,
  EDITOR_HISTORY_CLEAR
} from './actionTypes';

export function setActiveView(id) {
  return {
    type: EDITOR_SET_ACTIVE_VIEW,
    payload: {
      id: id
    }
  };
}

export function addView(id) {
  return {
    type: EDITOR_ADD_VIEW,
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
