import UiRecord from '../records/ui-record';

const INITIAL_STATE = new UiRecord();

export default function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
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
