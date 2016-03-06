import {fromJS} from 'immutable';
import axios from 'axios';
import { normalize, arrayOf, Schema } from 'normalizr';

export function toggleExpand(id) {
  return {
    type: 'INVENTORY_TOGGLE_EXPAND',
    payload: {
      id: id
    }
  };
}

export function fetch() {
  return {
    type: 'INVENTORY_FETCH',
    payload: {
      promise: axios.get('/api/inventory.json').then(response => response.data).then(transform)
    }
  };
}

const item = new Schema('item');
item.define({
  items: arrayOf(item)
});

function transform(data) {
  const normalized = normalize(data, arrayOf(item));
  return fromJS({
    inventoryIds: normalized.result,
    inventoryById: normalized.entities.item
  });
}
