import {List} from 'immutable';

import {
  SET_STATE,
  EDITOR_HISTORY_CLEAR
} from '../actions/actionTypes';

const INITIAL_STATE = List(['**import** history **from** *"history"*;']);

export default function editorHistoryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EDITOR_HISTORY_CLEAR:
      return state.clear();
    case SET_STATE:
      if (!action.payload.message) return state;
      return state.concat(`\n${action.payload.message}`.split('\n'));
    default:
      return state;
  }
}
