import { Map } from 'immutable';
import { Entity } from '../records';

import { SetState } from '../actions/messageActions';

type EntityObjectMap = Map<string, Entity>;
export const INITIAL_STATE: EntityObjectMap = Map<string, Entity>({});

export default (state = INITIAL_STATE, action: SetState) => {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action);
    default:
      return state;
  }
};

function setState(state: EntityObjectMap, action: SetState) {
  const entities = state.merge(action.payload.entities);
  return action.payload.entitiesToRemove.reduce((newEntities: Map<string, Entity>, toRemove: string) => {
    return newEntities.remove(toRemove);
  }, entities);
}

