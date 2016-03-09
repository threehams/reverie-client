import {List} from 'immutable';

export default function commandHistoryReducer(state = List(), action) {
  switch (action.type) {
    case 'HISTORY_FETCH_FULFILLED':
      return state.merge(action.payload.commandHistory);
    case 'COMMAND_SEND':
      return state.push(action.payload.command);
    case 'HISTORY_CLEAR':
      return state.clear();
    default:
      return state;
  }
}
