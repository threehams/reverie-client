import {Map, fromJS} from 'immutable';
import UiRecord from '../records/ui-record';

export default function uiReducer(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return new UiRecord();
    case 'INVENTORY_TOGGLE_EXPAND':
      return state.updateIn(['inventoryExpandedById', action.payload.id], expanded => !expanded);
    default:
      return state;
  }
}
