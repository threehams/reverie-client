import { createSelector } from 'reselect';

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
  [
    state => state.get('entities'),
    state => state.getIn(['ui', 'player']),
    state => state.get('location')
  ],
  (entities, player, location) => {
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
