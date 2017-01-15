import { Action } from 'redux-actions';
import { State } from './records';
import { commandReducer } from './reducers/commandReducer';
import { entitiesReducer } from './reducers/entitiesReducer';
import { transactionReducer } from './reducers/transactionReducer';

const INITIAL_STATE: State = new State();

// tslint:disable no-any
export const rootReducer = (state = INITIAL_STATE, action: Action<any>): State => {
  return state.merge({
    command: commandReducer(state.command, <any> action),
    entities: entitiesReducer(state.entities, <any> action),
    transactions: transactionReducer(state.transactions, <any> action),
  });
};
