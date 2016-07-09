import { Action } from 'redux-actions';
import entitiesReducer from './reducers/entitiesReducer';
import { State } from './records';

const INITIAL_STATE: State = new State();

export const rootReducer = (state = INITIAL_STATE, action: Action<any>): State => {
  return state.merge({
    entities: entitiesReducer(state.entities, <any> action),
  });
};
