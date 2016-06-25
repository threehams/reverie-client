import {OrderedSet, Map} from 'immutable';

import { Ui } from '../records';
import {
  Action,
  EDITOR_ADD_VIEW,
  INVENTORY_TOGGLE_EXPAND,
  INVENTORY_EXPAND_ITEMS,
  INVENTORY_TOGGLE_SELECT,
  EDITOR_REMOVE_VIEW,
  EDITOR_SELECT_ITEMS,
  EDITOR_SET_ACTIVE_VIEW,
  PLAYER_SET_ACTIVE_VIEW,
  RESIZE_PANEL,
  SET_STATE,
  SOCKET_STATUS,
} from '../actions/actionTypes';

export const INITIAL_STATE: Ui = new Ui();
const ALERTS: {[key: string]: string} = {
  disconnected: 'Reconnecting to server, give it a minute...',
  reconnected: '',
};

export default function uiReducer(state: Ui = INITIAL_STATE, action: Action): Ui {
  switch (action.type) {
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
    case RESIZE_PANEL:
      return state.set(action.payload.property, action.payload.size);
    default:
      return state;
  }
}

function addView(state: Ui, id: string) {
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
  const entitiesRemoved = action.payload.entitiesToRemove.reduce((removedState, id) => {
    return removeView(removedState, id)
      .update('inventoryExpandedById', expanded => expanded.remove(id));
  }, state);

  const withEffects = setStatusEffects(entitiesRemoved, action);
  // If player or location are provided, merge them into the state
  const newState = Map({ player: action.payload.player });
  return withEffects.mergeWith((prev, next) => next || prev, newState);
}

function setStatusEffects(state, action) {
  if (action.payload.statusEffects) {
    return state.set('statusEffects', action.payload.statusEffects);
  }
  return state;
}
