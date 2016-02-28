import {Map} from 'immutable';
import UiRecord from '../records/ui-record';

export default function uiReducer(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return new UiRecord();
    case 'INVENTORY_TOGGLE_EXPAND':
      return state.updateIn(['inventoryExpandedById', action.payload.id], expanded => !expanded);
    case 'COMMAND_SET_CURRENT':
      return state.set('currentCommand', action.payload.command);
    case 'COMMAND_SEND':
      return state.set('currentCommand', '');
    default:
      return state;
  }
}
