import {OrderedSet} from 'immutable';

import UiRecord from '../records/uiRecord';
import {
  COMMAND_SEND,
  SET_STATE,
  INVENTORY_TOGGLE_EXPAND,
  COMMAND_SET_CURRENT,
  EDITOR_ADD_VIEW,
  INVENTORY_TOGGLE_SELECT,
  EDITOR_SET_ACTIVE_VIEW,
  EDITOR_SELECT_ITEMS,
  EDITOR_REMOVE_VIEW
} from '../actions/actionTypes';

const INITIAL_STATE = new UiRecord();

export default function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case COMMAND_SEND:
      return state.set('currentCommand', '');
    case COMMAND_SET_CURRENT:
      return state.set('currentCommand', action.payload.command);
    case EDITOR_ADD_VIEW:
      return addView(state, action.payload.id);
    case EDITOR_REMOVE_VIEW:
      return removeView(state, action.payload.id);
    case EDITOR_SELECT_ITEMS:
      return state.set('selectedItems', OrderedSet(action.payload.ids));
    case EDITOR_SET_ACTIVE_VIEW:
      return state.set('activeEditorView', action.payload.id);
    case INVENTORY_TOGGLE_SELECT:
      return state.update('selectedItems', items => toggleSetItem(items, action.payload.id));
    case INVENTORY_TOGGLE_EXPAND:
      return state.updateIn(['inventoryExpandedById', action.payload.id], expanded => !expanded);
    case SET_STATE:
      return setState(state, action);
    default:
      return state;
  }
}

function addView(state, id) {
  return state.update('editorViews', views => views.add(id))
    .set('activeEditorView', id);
}

function toggleSetItem(state, id) {
  return state.includes(id) ? state.remove(id) : state.add(id);
}

function removeView(state, id) {
  const newState = state.update('editorViews', tabs => tabs.remove(id));
  return newState.update('activeEditorView', view => view === id ? newState.get('editorViews').last() : view);
}

function setState(state, action) {
  const newState = action.payload.entitiesToRemove.reduce((removedState, id) => {
    const viewRemoved = removeView(removedState, id);
    return viewRemoved.update('inventoryExpandedById', expanded => expanded.remove(id));
  }, state);
  if (action.payload.player) {
    return newState.set('player', action.payload.player);
  }
  return newState;
}
