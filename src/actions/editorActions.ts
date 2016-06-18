import {
  Action,
  EDITOR_ADD_VIEW,
  EDITOR_HISTORY_CLEAR,
  EDITOR_REMOVE_VIEW,
  EDITOR_SET_ACTIVE_VIEW,
} from './actionTypes';

export const setActiveView = (id): Action => ({
  payload: {
    id,
  },
  type: EDITOR_SET_ACTIVE_VIEW,
});

export const addView = (id): Action => ({
  payload: {
    id,
  },
  type: EDITOR_ADD_VIEW,
});

export const removeView = (id): Action => ({
  payload: {
    id,
  },
  type: EDITOR_REMOVE_VIEW,
});

export const clear = (): Action => ({
  type: EDITOR_HISTORY_CLEAR,
});
