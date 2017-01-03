import { Map } from 'immutable';
import { EntityState } from '../records';

import { SetState } from '../actions/messageActions';

export const INITIAL_STATE: EntityState = Map({}) as EntityState;

export const entitiesReducer = (state = INITIAL_STATE, action: SetState) => {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action);
    default:
      return state;
  }
};

function setState(state: EntityState, action: SetState) {
  const entities = state.merge(action.payload.entities);
  return action.payload.entitiesToRemove.reduce((newEntities: EntityState, toRemove: string) => {
    return newEntities.remove(toRemove);
  }, entities);
}
