import UiRecord from '../records/ui-record';

const INITIAL_STATE = new UiRecord();

export default function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ENTITY_FETCH_FULFILLED':
      return state.set('player', action.payload.player);
    case 'INVENTORY_TOGGLE_EXPAND':
      return state.updateIn(['inventoryExpandedById', action.payload.id], expanded => !expanded);
    case 'COMMAND_SET_CURRENT':
      return state.set('currentCommand', action.payload.command);
    case 'COMMAND_SEND':
      return state.set('currentCommand', '');
    case 'EDITOR_SET_ACTIVE_VIEW':
      return state.set('activeEditorView', action.payload.id);
    case 'EDITOR_REMOVE_VIEW':
      const newState = state.update('editorViews', tabs => tabs.filter(view => view !== action.payload.id));
      return newState.update('activeEditorView', view => view === action.payload.id ? newState.get('editorViews').last() : view);
    default:
      return state;
  }
}
