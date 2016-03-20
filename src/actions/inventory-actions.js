import { INVENTORY_TOGGLE_EXPAND } from './action-types';

export function toggleExpand(id) {
  return {
    type: INVENTORY_TOGGLE_EXPAND,
    payload: {
      id: id
    }
  };
}
