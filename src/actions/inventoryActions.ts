import { List } from 'immutable';
import * as inventorySelectors from '../selectors/inventorySelectors';
import * as commandActions from './commandActions';
import {
  EDITOR_SELECT_ITEMS,
  INVENTORY_TOGGLE_EXPAND,
  INVENTORY_TOGGLE_SELECT,
} from './actionTypes';

export const toggleExpand = (id) => ({
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
  return (dispatch, getState) => {

    /*
     * Build a list of item IDs for selection based on the first item selected in state
     * and the one currently being selected.
     */
    const createIdRange = () => {
      const state = getState();
      const entityList = inventorySelectors.list(state).get(owner).map(item => item.id);
      const selectedId = state.getIn(['ui', 'selectedItems']).first();
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
      type: EDITOR_SELECT_ITEMS,
    });
  };
};

export const toggleItem = (id: string) => ({
  payload: {
    id,
  },
  type: INVENTORY_TOGGLE_SELECT,
});
