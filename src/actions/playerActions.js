import { List } from 'immutable';
import * as commandActions from './commandActions';
import {
  PLAYER_SET_ACTIVE_VIEW,
  INVENTORY_EXPAND_ITEMS,
  EDITOR_SELECT_ITEMS
} from './actionTypes';

export const setActiveView = (name) => ({
  type: PLAYER_SET_ACTIVE_VIEW,
  payload: {
    name
  }
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
      type: INVENTORY_EXPAND_ITEMS,
      payload: {
        ids
      }
    });
    dispatch({
      type: EDITOR_SELECT_ITEMS,
      payload: {
        ids
      }
    });
  };
};
