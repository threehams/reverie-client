import { List } from 'immutable';
import { Dispatch } from 'redux';

import { State } from '../records';
import { CommandSend, sendCommand } from './commandActions';

export interface InventoryExpandItems {
  type: 'INVENTORY_EXPAND_ITEMS';
  payload: {
    ids: List<string>;
  };
};
export interface InventorySelectItems {
  type: 'INVENTORY_SELECT_ITEMS';
  payload: {
    ids: List<string>;
  };
};
export interface PlayerSetActiveView {
  type: 'PLAYER_SET_ACTIVE_VIEW';
  payload: {
    name: string;
  };
};

export const setActiveView = (name: string): PlayerSetActiveView => ({
  payload: {
    name,
  },
  type: 'PLAYER_SET_ACTIVE_VIEW',
});

export const attack = (id: string) => {
  return (dispatch: Dispatch<CommandSend>, getState: () => State) => {
    const entity = getState().getIn(['entities', id]);
    dispatch(sendCommand(`attack ${entity.name}`));
  };
};

// TODO don't send multiple actions from one thunk
export const locateItem = (id: string) => {
  return (dispatch: Dispatch<InventoryExpandItems | InventorySelectItems>) => {
    const ids = List([id]);

    // dispatch one action to expand a number of containers
    dispatch({
      payload: {
        ids,
      },
      type: 'INVENTORY_EXPAND_ITEMS',
    });
    dispatch({
      payload: {
        ids,
      },
      type: 'INVENTORY_SELECT_ITEMS',
    });
  };
};
