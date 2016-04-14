import {OrderedSet, Map} from 'immutable';

import UiRecord from '../records/UiRecord';
import {
  AUTOCOMPLETE_SET_INDEX,
  COMMAND_SEND,
  COMMAND_SET_CURRENT,
  EDITOR_ADD_VIEW,
  INVENTORY_TOGGLE_EXPAND,
  INVENTORY_EXPAND_ITEMS,
  INVENTORY_TOGGLE_SELECT,
  EDITOR_REMOVE_VIEW,
  EDITOR_SELECT_ITEMS,
  EDITOR_SET_ACTIVE_VIEW,
  PLAYER_SET_ACTIVE_VIEW,
  SET_STATE,
  SOCKET_STATUS
} from '../actions/actionTypes';

const INITIAL_STATE = new UiRecord();
const ALERTS = {
  disconnected: 'Reconnecting to server, give it a minute...',
  reconnected: ''
};

export default function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTOCOMPLETE_SET_INDEX:
      return state.set('selectedAutocompleteIndex', action.payload.index);
    case COMMAND_SEND:
      return state.set('currentCommand', '');
    case COMMAND_SET_CURRENT:
      return setCurrentCommand(state, action);
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
      return state.update('inventoryExpandedById', expanded => toggleSetItem(expanded, action.payload.id));
    case INVENTORY_EXPAND_ITEMS:
      return state.update('inventoryExpandedById', expanded => expanded.union(action.payload.ids));
    case SET_STATE:
      return setState(state, action);
    case SOCKET_STATUS:
      return state.set('alert', ALERTS[action.payload.status]);
    case PLAYER_SET_ACTIVE_VIEW:
      return state.set('activePlayerView', action.payload.name);
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

function setCurrentCommand(state, action) {
  const commandSet = state.set('currentCommand', action.payload.command);
  if (action.payload.command.length > 1 && !action.payload.closeAutocomplete) {
    return commandSet.set('autocompleteOpen', true);
  }

  return commandSet.set('autocompleteOpen', false)
    .set('selectedAutocompleteIndex', 0);
}

function setState(state, action) {
  const entitiesRemoved = action.payload.entitiesToRemove.reduce((removedState, id) => {
    return removeView(removedState, id)
      .update('inventoryExpandedById', expanded => expanded.remove(id));
  }, state);

  // If player or location are provided, merge them into the state
  const newState = Map({ player: action.payload.player, location: action.payload.location});
  return entitiesRemoved.mergeWith((prev, next) => next || prev, newState);
}
