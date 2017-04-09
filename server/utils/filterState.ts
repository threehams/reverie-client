import { List, Map, Set } from 'immutable';

import { Entity, EntityState, State } from '../records';

function locationDescription(location: Entity, entities: EntityState) {
  return location.description;
}

interface FilteredEntities {
  entities: EntityState;
  location: Entity;
  player: Entity;
}

export function filterEntity(entity: Entity): Entity {
  // if (entity.components.contains('container') && entity.states.contains('closed')) {
  //   return entity.update('entities', entities => entities.clear());
  // }
  return entity;
}

export function filterEntities(userId: string, entities: EntityState): FilteredEntities {
  function getEntityTree(entityIds: List<string>): List<string> {
    return entityIds.map((entityId) => {
      const entity = filterEntity(entities.get(entityId));
      return entity.entities.size ? getEntityTree(entity.entities).concat(entityId) : entityId;
    }).flatten().filter(id => id !== userId) as List<string>;
  }

  const user = entities.get(userId);
  // TODO add "parentId" to entities and it'll fix a lot of these linear operations... at the cost
  // of larger state deltas
  const location = entities.find(entity => entity.entities.includes(userId));
  const ids = Set(getEntityTree(user.entities)).union(getEntityTree(location.entities));
  return {
    entities: entities.filter((entity, id) => ids.includes(id)),
    location: location.set('entities', location.entities.filter(entityId => entityId !== userId)),
    player: entities.get(userId),
  };
}

export function filterInitialState(userId: string, state: State) {
  const filtered = filterEntities(userId, state.entities);
  return Map({
    availableCommands: state.command.available,
    entities: filtered.entities,
    location: filtered.location,
    message: locationDescription(filtered.location, state.entities),
    player: filtered.player,
  });
}
