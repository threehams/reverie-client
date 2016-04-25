import { List } from 'immutable';
import { createSelector } from 'reselect';
import * as entitySelectors from './entitySelectors';

export const list = createSelector(
  [
    entitySelectors.entitiesWithPath,
    (state, props) => props.owner,
    state => state.get('ui'),
    state => state.get('location')
  ],
  (entities, owner, ui, location) => {
    return entityIds(owner, entities).flatMap(entityId => addUiData(entityId, 1));

    function addUiData(entityId, indent) {
      const expanded = ui.inventoryExpandedById.contains(entityId);
      const newEntity = entities
      .get(entityId)
      .merge({
        indent,
        selected: ui.selectedItems.contains(entityId),
        expanded,
      });
      if (!expanded) return List([newEntity]);
      return List([newEntity]).concat(newEntity.entities.flatMap(id => addUiData(id, indent + 1)));
    }

    function entityIds() {
      if (owner === 'self') {
        return entities.getIn([ui.player, 'entities']) || List([]);
      } else if (owner === 'floor') {
        return location.entities || List([]);
      }
      return List([]);
    }
  }
);
