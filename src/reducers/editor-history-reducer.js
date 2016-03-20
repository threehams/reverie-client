import {List} from 'immutable';

import {
  MERGE_STATE,
  EDITOR_HISTORY_CLEAR
} from '../actions/action-types';

export default function editorHistoryReducer(state = List(), action) {
  switch (action.type) {
    case MERGE_STATE:
      if (!action.payload.message) return state;
      return state.concat(`${action.payload.message}\n`.split('\n'));
    case EDITOR_HISTORY_CLEAR:
      return state.clear();
    default:
      return state;
  }
}
