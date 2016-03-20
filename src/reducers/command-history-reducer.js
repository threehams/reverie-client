import {List} from 'immutable';

import {
  COMMAND_SEND,
  COMMAND_HISTORY_CLEAR
} from '../actions/action-types';

export default function commandHistoryReducer(state = List(), action) {
  switch (action.type) {
    case COMMAND_SEND:
      return state.push(action.payload.command);
    case COMMAND_HISTORY_CLEAR:
      return state.clear();
    default:
      return state;
  }
}
