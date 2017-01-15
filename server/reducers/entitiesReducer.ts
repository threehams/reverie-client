import { Map } from 'immutable';
import { EntityState } from '../records';

import { SetServerState, SetState } from '../actions/messageActions';

export const INITIAL_STATE: EntityState = Map({}) as EntityState;
type Actions = SetState | SetServerState;

export const entitiesReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action);
    case 'SET_SERVER_STATE':
      return setState(state, action);
    default:
      return state;
  }
};

function setState(state: EntityState, action: SetState | SetServerState): EntityState {
  return state.merge(action.payload.entities);
}
