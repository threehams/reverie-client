import { List } from 'immutable';
import {
  INVENTORY_TOGGLE_EXPAND,
  EDITOR_ADD_VIEW,
  EDITOR_TOGGLE_ITEM,
  EDITOR_SELECT_ITEMS
} from './action-types';

export function toggleExpand(id) {
  return {
    type: INVENTORY_TOGGLE_EXPAND,
    payload: {
      id: id
    }
  };
}

export function addView(id) {
  return {
    type: EDITOR_ADD_VIEW,
    payload: {
      id: id
    }
  };
}

// options: { multiple: true/false }
export function selectItem(selectId, containerId, options = {}) {
  return (dispatch, getState) => {

    // this is the poster child for TDD
    let ids;
    if (options.multiple) {
      const state = getState();
      const selectedId = state.getIn(['ui', 'selectedItems']).first();
      const entityList = getEntityChildren(containerId, state.get('entities'));
      const first = entityList.findIndex(id => id === selectedId);
      const last = entityList.findIndex(id => id === selectId);
      ids = List(entityList.slice(Math.min(first, last), Math.max(first, last) + 1));
    } else {
      ids = List([selectId]);
    }

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
    type: EDITOR_TOGGLE_ITEM,
    payload: {
      id: id
    }
  };
}
