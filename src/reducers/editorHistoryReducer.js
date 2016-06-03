import {List} from 'immutable';

import {
  SET_STATE,
  EDITOR_HISTORY_CLEAR
} from '../actions/actionTypes';

export const INITIAL_STATE = List();

export default function editorHistoryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EDITOR_HISTORY_CLEAR:
      return state.clear();
    case SET_STATE:
      if (!action.payload.message) return state;
      return state.concat(`${state.size ? '\n' : ''}${action.payload.message}`.split('\n'));
    default:
      return state;
  }
}
