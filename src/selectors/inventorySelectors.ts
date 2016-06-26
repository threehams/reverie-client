import { Map, List } from 'immutable';
import { createSelector } from 'reselect';
import * as entitySelectors from './entitySelectors';
import { Entity, Location, Ui } from '../records';

type EntityMap = Map<string, Entity>;
type EntityList = List<Entity>;
type OwnerEntityMap = Map<string, EntityList>;

export const list = createSelector(
  entitySelectors.entitiesWithPath,
  state => state.ui,
  state => state.location,
  (entities: EntityMap, ui: Ui, location: Location): OwnerEntityMap => {
    const floorEntities = entityIds('floor').flatMap(entityId => addUiData(entityId, 1));
    const selfEntities = entityIds('self').flatMap(entityId => addUiData(entityId, 1));
    return Map({
      floor: floorEntities,
      self: selfEntities,
    });

    function addUiData(entityId: string, indent: number): List<Entity> {
      const expanded = ui.inventoryExpandedById.contains(entityId);
      const newEntity = entities
      .get(entityId)
      .merge({
        indent,
        selected: ui.selectedItems.contains(entityId),
        expanded,
      });
      if (!expanded) {
        return List([newEntity]);
      }
      return List([newEntity]).concat(newEntity.entities.flatMap(id => addUiData(id, indent + 1)));
    }

    function entityIds(owner: 'self' | 'floor'): List<string> {
      if (owner === 'self') {
        return entities.getIn([ui.player, 'entities']) || List([]);
      } else if (owner === 'floor') {
        return location.entities || List([]);
      }
      return List([]);
    }
  }
);
