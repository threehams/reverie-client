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
    type: 'ENTITY_FETCH',
    payload: {
      promise: axios.get('/api/inventory.json').then(response => response.data).then(transform)
    }
  };
}

const entity = new Schema('entity');
entity.define({});

function transform(data) {
  const normalized = normalize(data, {
    entities: arrayOf(entity)
  });
  return {
    player: normalized.result.player,
    entityById: fromJS(normalized.entities.entity)
  };
}
