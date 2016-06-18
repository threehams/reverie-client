import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { EntityType } from '../records/EntityRecord';
import { LocationType } from '../records/LocationRecord';

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
  (state: Map<any, any>) => state.get('entities'),
  (state: Map<any, any>) => state.getIn(['ui', 'player']),
  (state: Map<any, any>) => state.get('location'),
  (entities: Map<string, EntityType>, player: string, location: LocationType) => {
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
