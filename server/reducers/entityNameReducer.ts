import { List, Map, Set } from 'immutable';
import { Entity, EntityNameState, EntityState } from '../records';

import { MoveEntity } from '../actions/entityActions';
import { SetState } from '../actions/messageActions';

export const INITIAL_STATE: EntityNameState = Map({}) as EntityNameState;
type Actions = SetState | MoveEntity;

export const entityNameReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action);
    default:
      return state;
  }
};

function mapEntities(entities: EntityState, entity: Entity): string | EntityNameState {
  if (!entity.entities.size) {
    return Map({ id: entity.id });
  }

  // return entity.entities
  return entity.entities.reduce((nameMap, entityId) => {
    return nameMap.set(entities.get(entityId).name, mapEntities(entities, entities.get(entityId)));
  }, Map({ id: entity.id }) as EntityNameState);
}

function setState(state: EntityNameState, action: SetState): EntityNameState {
  const mappable = action.payload.entities.filter(entity => {
    return entity.entities.size && !!entity.components.intersect(Set(['location', 'creature'])).size;
  });
  return mappable.reduce((nameMap, entity) => {
    return nameMap.set(entity.id, mapEntities(action.payload.entities, entity));
  }, Map({})) as EntityNameState;
}
