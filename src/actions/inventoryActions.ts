import { Action } from 'redux-actions';
import { List } from 'immutable';
import { Dispatch } from 'redux';

import * as inventorySelectors from '../selectors/inventorySelectors';
import * as commandActions from './commandActions';
import { State } from '../records';

export const INVENTORY_SELECT_ITEMS = 'INVENTORY_SELECT_ITEMS';
export type INVENTORY_SELECT_ITEMS = { ids: List<string>, owner: string };
export const INVENTORY_TOGGLE_EXPAND = 'INVENTORY_TOGGLE_EXPAND';
export type INVENTORY_TOGGLE_EXPAND = { id: string };
export const INVENTORY_TOGGLE_SELECT = 'INVENTORY_TOGGLE_SELECT';
export type INVENTORY_TOGGLE_SELECT = { id: string };

export const toggleExpand = (id: string): Action<INVENTORY_TOGGLE_EXPAND> => ({
  payload: {
    id,
  },
  type: INVENTORY_TOGGLE_EXPAND,
});

export const moveItem = (sourcePath: string, targetPath: string) => {
  return commandActions.sendCommand(`transfer ${sourcePath} to ${targetPath}`);
};

// options: { multiple: true/false }
export const selectItem = (
  selectId: string,
  owner: string,
  options = { multiple: false }
) => {
  return (dispatch: Dispatch<Action<INVENTORY_SELECT_ITEMS>>, getState) => {

    /*
     * Build a list of item IDs for selection based on the first item selected in state
     * and the one currently being selected.
     */
    const createIdRange = () => {
      const state: State = getState();
      const entityList = inventorySelectors.list(state).get(owner).map(item => item.id).toList();
      const selectedId = state.ui.selectedItems.first();
      const first = entityList.findIndex(id => id === selectedId);
      const last = entityList.findIndex(id => id === selectId);
      const result = List(entityList.slice(Math.min(first, last), Math.max(first, last) + 1));
      return first < last ? result : result.reverse();
    };

    const ids = options.multiple ? createIdRange() : List([selectId]);

    dispatch({
      payload: {
        ids,
        owner,
      },
      type: INVENTORY_SELECT_ITEMS,
    });
  };
};

export const toggleItem = (id: string): Action<INVENTORY_TOGGLE_SELECT> => ({
  payload: {
    id,
  },
  type: INVENTORY_TOGGLE_SELECT,
});
