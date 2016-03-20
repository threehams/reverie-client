import { INVENTORY_TOGGLE_EXPAND, EDITOR_ADD_VIEW } from './action-types';

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
