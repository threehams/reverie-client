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
    case 'EDITOR_SET_ACTIVE_VIEW':
      return state.set('activeEditorView', action.payload.id);
    case 'EDITOR_REMOVE_VIEW':
      const tabRemoved = state.set('editorTabs', state.get('editorTabs').filter(tab => tab.id !== action.payload.id));
      return state.get('activeEditorView') === action.payload.id ? tabRemoved.set('activeEditorView', tabRemoved.get('editorTabs').last().id) : tabRemoved;
    default:
      return state;
  }
}
