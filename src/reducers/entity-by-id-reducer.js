import {Map} from 'immutable';
import InventoryItemRecord from '../records/inventory-item-record';

export default function entityByIdReducer(state = Map(), action) {
  switch (action.type) {
    case 'ENTITY_FETCH_FULFILLED':
      return action.payload.get('entityById').map(inventoryItem => {
        return new InventoryItemRecord(inventoryItem);
      });
    default:
      return state;
  }
}
