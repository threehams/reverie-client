import { List } from 'immutable';
import * as commandActions from './commandActions';
import {
  INVENTORY_TOGGLE_EXPAND,
  INVENTORY_TOGGLE_SELECT,
  EDITOR_SELECT_ITEMS
} from './actionTypes';

export function toggleExpand(id) {
  return {
    type: INVENTORY_TOGGLE_EXPAND,
    payload: {
      id
    }
  };
}

export function moveItem(sourcePath, targetPath) {
  return commandActions.sendCommand(`transfer ${sourcePath} to ${targetPath}`);
}

// options: { multiple: true/false }
export function selectItem(selectId, containerId, options = {}) {
  return (dispatch, getState) => {

    /*
     * Build a list of item IDs for selection based on the first item selected in state
     * and the one currently being selected.
     */
    function createIdRange() {
      const state = getState();
      const selectedId = state.getIn(['ui', 'selectedItems']).first();
      const entityList = getEntityChildren(containerId, state.get('entities'));
      const first = entityList.findIndex(id => id === selectedId);
      const last = entityList.findIndex(id => id === selectId);
      return List(entityList.slice(Math.min(first, last), Math.max(first, last) + 1));
    }

    const ids = options.multiple ? createIdRange() : List([selectId]);

    dispatch({
      type: EDITOR_SELECT_ITEMS,
      payload: {
        ids,
        containerId
      }
    });
  };
}

function getEntityChildren(id, entities) {
  const entity = entities.get(id);
  if (!entity.entities || !entity.entities.size) {
    return List([id]);
  }

  return List([id]).concat(entity.entities.flatMap(entityId => {
    return getEntityChildren(entityId, entities);
  }));
}

export function toggleItem(id) {
  return {
    type: INVENTORY_TOGGLE_SELECT,
    payload: {
      id
    }
  };
}
