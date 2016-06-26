import { Action } from 'redux-actions';

export const EDITOR_ADD_VIEW = 'EDITOR_ADD_VIEW';
export type EDITOR_ADD_VIEW = { id: string };
export const EDITOR_HISTORY_CLEAR = 'EDITOR_HISTORY_CLEAR';
export type EDITOR_HISTORY_CLEAR = {};
export const EDITOR_REMOVE_VIEW = 'EDITOR_REMOVE_VIEW';
export type EDITOR_REMOVE_VIEW = { id: string };
export const EDITOR_SET_ACTIVE_VIEW = 'EDITOR_SET_ACTIVE_VIEW';
export type EDITOR_SET_ACTIVE_VIEW = { id: string };

export const setActiveView = (id: string): Action<EDITOR_SET_ACTIVE_VIEW> => ({
  payload: {
    id,
  },
  type: EDITOR_SET_ACTIVE_VIEW,
});

export const addView = (id: string): Action<EDITOR_ADD_VIEW> => ({
  payload: {
    id,
  },
  type: EDITOR_ADD_VIEW,
});

export const removeView = (id: string): Action<EDITOR_REMOVE_VIEW> => ({
  payload: {
    id,
  },
  type: EDITOR_REMOVE_VIEW,
});

export const clear = (): Action<EDITOR_HISTORY_CLEAR> => ({
  type: EDITOR_HISTORY_CLEAR,
});
