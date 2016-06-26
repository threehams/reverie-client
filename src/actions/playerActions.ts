import { Action } from 'redux-actions';
import { Dispatch } from 'redux';
import { List } from 'immutable';
import * as commandActions from './commandActions';

export const INVENTORY_EXPAND_ITEMS = 'INVENTORY_EXPAND_ITEMS';
export type INVENTORY_EXPAND_ITEMS = { ids: List<string> };
export const INVENTORY_SELECT_ITEMS = 'INVENTORY_SELECT_ITEMS';
export type INVENTORY_SELECT_ITEMS = { ids: List<string> };
export const PLAYER_SET_ACTIVE_VIEW = 'PLAYER_SET_ACTIVE_VIEW';
export type PLAYER_SET_ACTIVE_VIEW = { name: string };

export const setActiveView = (name: string): Action<PLAYER_SET_ACTIVE_VIEW> => ({
  payload: {
    name,
  },
  type: PLAYER_SET_ACTIVE_VIEW,
});

export const attack = (id: string) => {
  return (dispatch: Dispatch<commandActions.COMMAND_SEND>, getState) => {
    const entity = getState().getIn(['entities', id]);
    dispatch(commandActions.sendCommand(`attack ${entity.name}`));
  };
};

// TODO don't send multiple actions from one thunk
export const locateItem = (id: string) => {
  return (dispatch: Dispatch<any>) => {
    const ids = List([id]);

    // dispatch one action to expand a number of containers
    dispatch({
      payload: {
        ids,
      },
      type: INVENTORY_EXPAND_ITEMS,
    });
    dispatch({
      payload: {
        ids,
      },
      type: INVENTORY_SELECT_ITEMS,
    });
  };
};
