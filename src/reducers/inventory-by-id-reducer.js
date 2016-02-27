import {List} from 'immutable';
import InventoryItemRecord from '../records/inventory-item-record';

export default function inventoryByIdReducer(state = List(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload.get('inventoryById').map(inventoryItem => {
        return new InventoryItemRecord(inventoryItem);
      });
    default:
      return state;
  }
}
