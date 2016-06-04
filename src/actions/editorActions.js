import {
  EDITOR_ADD_VIEW,
  EDITOR_SET_ACTIVE_VIEW,
  EDITOR_REMOVE_VIEW,
  EDITOR_HISTORY_CLEAR
} from './actionTypes';

export const setActiveView = (id) => ({
  type: EDITOR_SET_ACTIVE_VIEW,
  payload: {
    id
  }
});

export const addView = (id) => ({
  type: EDITOR_ADD_VIEW,
  payload: {
    id
  }
});

export const removeView = (id) => ({
  type: EDITOR_REMOVE_VIEW,
  payload: {
    id
  }
});

export const clear = () => ({
  type: EDITOR_HISTORY_CLEAR
});
