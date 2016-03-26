import {List} from 'immutable';

import {
  SET_STATE,
  EDITOR_HISTORY_CLEAR
} from '../actions/action-types';

export default function editorHistoryReducer(state = List(), action) {
  switch (action.type) {
    case EDITOR_HISTORY_CLEAR:
      return state.clear();
    case SET_STATE:
      if (!action.payload.message) return state;
      return state.concat(`${action.payload.message}\n`.split('\n'));
    default:
      return state;
  }
}
