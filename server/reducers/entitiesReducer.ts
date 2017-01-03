import { List, Map } from 'immutable';
import { EntityState } from '../records';

import { MoveEntity } from '../actions/entityActions';
import { SetState } from '../actions/messageActions';

export const INITIAL_STATE: EntityState = Map({}) as EntityState;
type Actions = SetState | MoveEntity;

export const entitiesReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action);
    case 'ENTITY_MOVE':
      return moveEntity(state, action);
    default:
      return state;
  }
};

function setState(state: EntityState, action: SetState): EntityState {
  const entities = state.merge(action.payload.entities);
  return action.payload.entitiesToRemove.reduce((newEntities: EntityState, toRemove: string) => {
    return newEntities.remove(toRemove);
  }, entities);
}

function moveEntity(state: EntityState, action: MoveEntity): EntityState {
  return state.updateIn([action.payload.parentId, 'entities'], (entities: List<string>): List<string> => {
    return entities.filter(entityId => entityId !== action.payload.destinationId);
  }).setIn([action.payload.id, action.payload.parentId], action.payload.destinationId);
}
