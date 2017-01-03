import { List, Map } from 'immutable';
import { Entity } from '../records';

import { MoveEntity } from '../actions/entityActions';
import { SetState } from '../actions/messageActions';

type EntityObjectMap = Map<string, Entity>;
export const INITIAL_STATE: EntityObjectMap = Map<string, Entity>({});
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

function setState(state: EntityObjectMap, action: SetState): EntityObjectMap {
  const entities = state.merge(action.payload.entities);
  return action.payload.entitiesToRemove.reduce((newEntities: Map<string, Entity>, toRemove: string) => {
    return newEntities.remove(toRemove);
  }, entities);
}

function moveEntity(state: EntityObjectMap, action: MoveEntity): EntityObjectMap {
  return state.updateIn([action.payload.parentId, 'entities'], (entities: List<string>): List<string> => {
    return entities.filter(entityId => entityId !== action.payload.destinationId);
  }).setIn([action.payload.id, action.payload.parentId], action.payload.destinationId);
}
