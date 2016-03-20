import UiRecord from '../records/ui-record';
import {
  COMMAND_SEND,
  SET_STATE,
  MERGE_STATE,
  INVENTORY_TOGGLE_EXPAND,
  COMMAND_SET_CURRENT,
  EDITOR_ADD_VIEW,
  EDITOR_SET_ACTIVE_VIEW,
  EDITOR_REMOVE_VIEW
} from '../actions/action-types';

const INITIAL_STATE = new UiRecord();

export default function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_STATE:
      return state.set('player', action.payload.player);
    case MERGE_STATE:
      return action.payload.entitiesToRemove.reduce((newState, id) => {
        const viewRemoved = removeView(newState, id);
        return viewRemoved.update('inventoryExpandedById', expanded => expanded.remove(id));
      }, state);
    case INVENTORY_TOGGLE_EXPAND:
      return state.updateIn(['inventoryExpandedById', action.payload.id], expanded => !expanded);
    case COMMAND_SET_CURRENT:
      return state.set('currentCommand', action.payload.command);
    case COMMAND_SEND:
      return state.set('currentCommand', '');
    case EDITOR_ADD_VIEW:
      const viewAdded = state.update('editorViews', views => views.add(action.payload.id));
      return viewAdded.set('activeEditorView', action.payload.id);
    case EDITOR_SET_ACTIVE_VIEW:
      return state.set('activeEditorView', action.payload.id);
    case EDITOR_REMOVE_VIEW:
      return removeView(state, action.payload.id);
    default:
      return state;
  }
}

function removeView(state, id) {
  const newState = state.update('editorViews', tabs => tabs.remove(id));
  return newState.update('activeEditorView', view => view === id ? newState.get('editorViews').last() : view);
}
