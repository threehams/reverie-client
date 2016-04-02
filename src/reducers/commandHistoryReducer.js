import {List} from 'immutable';

import {
  COMMAND_SEND,
  COMMAND_HISTORY_CLEAR
} from '../actions/actionTypes';

export default function commandHistoryReducer(state = List(), action) {
  switch (action.type) {
    case COMMAND_HISTORY_CLEAR:
      return state.clear();
    case COMMAND_SEND:
      return state.push(action.payload.command);
    default:
      return state;
  }
}