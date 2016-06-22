import { List } from 'immutable';
import * as commandActions from './commandActions';
import {
  EDITOR_SELECT_ITEMS,
  INVENTORY_EXPAND_ITEMS,
  PLAYER_SET_ACTIVE_VIEW,
} from './actionTypes';

export const setActiveView = (name) => ({
  payload: {
    name,
  },
  type: PLAYER_SET_ACTIVE_VIEW,
});

export const move = (direction) => {
  return commandActions.sendCommand(direction.toString());
};

export const attack = (id) => {
  return (dispatch, getState) => {
    const entity = getState().getIn(['entities', id]);
    dispatch(commandActions.sendCommand(`attack ${entity.name}`));
  };
};

export const locateItem = (id) => {
  return (dispatch) => {
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
      type: EDITOR_SELECT_ITEMS,
    });
  };
};
