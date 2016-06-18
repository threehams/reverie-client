import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { Entity, Location, State } from '../records';

function addPaths(entity, entities, owner, path) {
  const newPath = `${path}/${entity.name}`;
  const pathSet = entity.merge({ owner, path: newPath });
  let newEntities = entities;
  entity.entities.forEach(entityId => {
    newEntities = addPaths(newEntities.get(entityId), newEntities, owner, newPath);
  });
  return newEntities.set(entity.id, pathSet);
}

export const entitiesWithPath = createSelector(
  (state: State) => state.entities,
  (state: State) => state.ui.player,
  (state: State) => state.location,
  (entities: Map<string, Entity>, player: string, location: Location) => {
    const playerEntity = entities.get(player);
    let newEntities = entities;
    if (playerEntity) {
      playerEntity.entities.forEach(entityId => {
        newEntities = addPaths(newEntities.get(entityId), newEntities, 'self', 'self');
      });
    }
    if (location) {
      location.entities.forEach(entityId => {
        newEntities = addPaths(newEntities.get(entityId), newEntities, 'floor', 'floor');
      });
    }
    return newEntities;
  }
);
