import { OrderedSet } from 'immutable';

import { EditorAddView, EditorRemoveView, EditorSetActiveView } from '../actions/editorActions';
import { InventorySelectItems, InventoryToggleExpand, InventoryToggleSelect } from '../actions/inventoryActions';
import { ResizePanel } from '../actions/layoutActions';
import { SetState } from '../actions/messageActions';
import { InventoryExpandItems, PlayerSetActiveView } from '../actions/playerActions';
import { SocketStatus } from '../actions/socketActions';
import { Ui } from '../records';

export const INITIAL_STATE: Ui = new Ui();
const ALERTS: {[key: string]: string} = {
  disconnected: 'Reconnecting to server, give it a minute...',
  reconnected: '',
};
type Actions = SetState |
  SocketStatus |
  EditorAddView |
  EditorRemoveView |
  EditorSetActiveView |
  InventoryToggleExpand |
  InventoryToggleSelect |
  InventorySelectItems |
  InventoryExpandItems |
  PlayerSetActiveView |
  ResizePanel;

export const uiReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case 'EDITOR_ADD_VIEW':
      return addView(state, action.payload.id);
    case 'EDITOR_REMOVE_VIEW':
      return removeView(state, action.payload.id);
    case 'INVENTORY_SELECT_ITEMS':
      return state.set('selectedItems', OrderedSet(action.payload.ids));
    case 'EDITOR_SET_ACTIVE_VIEW':
      return state.set('activeEditorView', action.payload.id);
    case 'INVENTORY_TOGGLE_SELECT':
      return toggleSelect(state, action);
    case 'INVENTORY_TOGGLE_EXPAND':
      return toggleExpand(state, action);
    case 'INVENTORY_EXPAND_ITEMS':
      return expandItems(state, action);
    case 'SET_STATE':
      return setState(state, action);
    case 'SOCKET_STATUS':
      return state.set('alert', ALERTS[action.payload.status]);
    case 'PLAYER_SET_ACTIVE_VIEW':
      return state.set('activePlayerView', action.payload.name);
    case 'RESIZE_PANEL':
      return state.set(action.payload.property, action.payload.size);
    default:
      return state;
  }
};

function expandItems(state: Ui, action: InventoryExpandItems): Ui {
  return state.update('inventoryExpandedById', (expanded) => expanded.union(action.payload.ids));
}

function toggleExpand(state: Ui, action: InventoryToggleExpand): Ui {
  return state.update('inventoryExpandedById', (expanded) => toggleSetItem(expanded, action.payload.id));
}

function toggleSelect(state: Ui, action: InventoryToggleSelect): Ui {
  return state.update('selectedItems', (items) => toggleSetItem(items, action.payload.id));
}

function addView(state: Ui, id: string): Ui {
  return state.update('editorViews', (views) => views.add(id))
    .set('activeEditorView', id);
}

function toggleSetItem(state: OrderedSet<string>, id: string): OrderedSet<string> {
  return state.includes(id) ? state.remove(id) : state.add(id);
}

function removeView(state: Ui, id: string): Ui {
  const newState = state.update('editorViews', (tabs) => tabs.remove(id));
  return newState.update('activeEditorView', (view) => view === id ? newState.get('editorViews').last() : view);
}

function setState(state: Ui, action: SetState): Ui {
  const entitiesRemoved = action.payload.entities ? action.payload.entities.filter(entity => entity === null).reduce((removedState, entity, id) => {
    return removeView(removedState, id)
      .update('inventoryExpandedById', expanded => expanded.remove(id));
  }, state) : state;

  return setStatusEffects(entitiesRemoved, action);
}

function setStatusEffects(state: Ui, action: SetState): Ui {
  if (action.payload.statusEffects) {
    return state.set('statusEffects', action.payload.statusEffects);
  }
  return state;
}
