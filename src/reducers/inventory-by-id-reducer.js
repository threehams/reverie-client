import {Map} from 'immutable';
import InventoryItemRecord from '../records/inventory-item-record';

export default function inventoryByIdReducer(state = Map(), action) {
  switch (action.type) {
    case 'INVENTORY_FETCH_FULFILLED':
      return action.payload.get('inventoryById').map(inventoryItem => {
        return new InventoryItemRecord(inventoryItem);
      });
    default:
      return state;
  }
}
