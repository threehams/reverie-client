import { List } from 'immutable';
import * as commandActions from './commandActions';
import {
  PLAYER_SET_ACTIVE_VIEW,
  INVENTORY_EXPAND_ITEMS,
  EDITOR_SELECT_ITEMS
} from './actionTypes';

function buildExpandList(entities, id) {
  return List([id]);
}

export function setActiveView(name) {
  return {
    type: PLAYER_SET_ACTIVE_VIEW,
    payload: {
      name
    }
  };
}

export function move(direction) {
  return commandActions.sendCommand(direction.toString());
}

export function attack(id) {
  return (dispatch, getState) => {
    const entity = getState().getIn(['entities', id]);
    dispatch(commandActions.sendCommand(`attack ${entity.name}`));
  };
}

export function locateItem(id) {
  return (dispatch, getState) => {
    const entities = getState().get('entities');
    const ids = buildExpandList(entities, id);

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
}
