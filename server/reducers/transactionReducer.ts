import { List, Map } from 'immutable';
import { TransactionState } from '../records';

import { SetServerState } from '../actions/messageActions';

export const INITIAL_STATE: TransactionState = List([]);
type Actions = SetServerState;

export const transactionReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case 'SET_SERVER_STATE':
      return state.push(action.payload);
    default:
      return state;
  }
};
