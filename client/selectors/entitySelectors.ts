import { createSelector } from 'reselect';
import { Entity, EntityState, State } from '../records';

function addPaths(entity: Entity, entities: EntityState, owner: string, path: string) {
  const newPath = `${path}/${entity.name}`;
  const pathSet = entity.merge({ owner, path: newPath });
  let newEntities = entities;
  entity.entities.forEach((entityId) => {
    newEntities = addPaths(newEntities.get(entityId), newEntities, owner, newPath);
  });
  return newEntities.set(entity.id, pathSet);
}

export const entitiesWithPath = createSelector(
  (state: State) => state.entities,
  (state: State) => state.player,
  (state: State) => state.location,
  (entities, player, location) => {
    let newEntities = entities;
    if (player) {
      player.entities.forEach((entityId) => {
        newEntities = addPaths(newEntities.get(entityId), newEntities, 'self', 'self');
      });
    }
    if (location) {
      location.entities.forEach((entityId) => {
        newEntities = addPaths(newEntities.get(entityId), newEntities, 'floor', 'floor');
      });
    }
    return newEntities;
  },
);
