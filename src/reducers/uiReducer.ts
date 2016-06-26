import { Action, handleActions } from 'redux-actions';
import { OrderedSet, Map } from 'immutable';

import { SET_STATE } from '../actions/messageActions';
import { SOCKET_STATUS } from '../actions/socketActions';
import { EDITOR_ADD_VIEW, EDITOR_REMOVE_VIEW, EDITOR_SET_ACTIVE_VIEW } from '../actions/editorActions';
import { INVENTORY_TOGGLE_EXPAND, INVENTORY_TOGGLE_SELECT, INVENTORY_SELECT_ITEMS } from '../actions/inventoryActions';
import { INVENTORY_EXPAND_ITEMS, PLAYER_SET_ACTIVE_VIEW } from '../actions/playerActions';
import { RESIZE_PANEL } from '../actions/layoutActions';
import { Ui } from '../records';

export const INITIAL_STATE: Ui = new Ui();
const ALERTS: {[key: string]: string} = {
  disconnected: 'Reconnecting to server, give it a minute...',
  reconnected: '',
};

export default handleActions({
  DEFAULT: (state: Ui, action: Action<{}>) => {
    return state;
  },
  [EDITOR_ADD_VIEW]: (state: Ui, action: Action<EDITOR_ADD_VIEW>) => {
    return addView(state, action.payload.id);
  },
  [EDITOR_REMOVE_VIEW]: (state: Ui, action: Action<EDITOR_REMOVE_VIEW>) => {
    return removeView(state, action.payload.id);
  },
  [INVENTORY_SELECT_ITEMS]: (state: Ui, action: Action<INVENTORY_SELECT_ITEMS>) => {
    return state.set('selectedItems', OrderedSet(action.payload.ids));
  },
  [EDITOR_SET_ACTIVE_VIEW]: (state: Ui, action: Action<EDITOR_SET_ACTIVE_VIEW>) => {
    return state.set('activeEditorView', action.payload.id);
  },
  [INVENTORY_TOGGLE_SELECT]: (state: Ui, action: Action<INVENTORY_TOGGLE_SELECT>) => {
    return state.update('selectedItems', items => toggleSetItem(items, action.payload.id));
  },
  [INVENTORY_TOGGLE_EXPAND]: (state: Ui, action: Action<INVENTORY_TOGGLE_EXPAND>) => {
    return state.update('inventoryExpandedById', expanded => toggleSetItem(expanded, action.payload.id));
  },
  [INVENTORY_EXPAND_ITEMS]: (state: Ui, action: Action<INVENTORY_EXPAND_ITEMS>) => {
    return state.update('inventoryExpandedById', expanded => expanded.union(action.payload.ids));
  },
  [SET_STATE]: (state: Ui, action: Action<SET_STATE>) => {
    return setState(state, action);
  },
  [SOCKET_STATUS]: (state: Ui, action: Action<SOCKET_STATUS>) => {
    return state.set('alert', ALERTS[action.payload.status]);
  },
  [PLAYER_SET_ACTIVE_VIEW]: (state: Ui, action: Action<PLAYER_SET_ACTIVE_VIEW>) => {
    return state.set('activePlayerView', action.payload.name);
  },
  [RESIZE_PANEL]: (state: Ui, action: Action<RESIZE_PANEL>) => {
    return state.set(action.payload.property, action.payload.size);
  },
}, INITIAL_STATE);

function addView(state: Ui, id: string): Ui {
  return state.update('editorViews', views => views.add(id))
    .set('activeEditorView', id);
}

function toggleSetItem(state: OrderedSet<string>, id: string): OrderedSet<string> {
  return state.includes(id) ? state.remove(id) : state.add(id);
}

function removeView(state: Ui, id: string): Ui {
  const newState = state.update('editorViews', tabs => tabs.remove(id));
  return newState.update('activeEditorView', view => view === id ? newState.get('editorViews').last() : view);
}

function setState(state: Ui, action: Action<SET_STATE>): Ui {
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
