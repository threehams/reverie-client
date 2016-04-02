import {fromJS, List, Map} from 'immutable';

import {
  SET_STATE
} from './actionTypes';

export function setState(state) {
  return {
    type: SET_STATE,
    payload: {
      player: state.player,
      entities: fromJS(state.entities) || Map(),
      entitiesToRemove: fromJS(state.entitiesToRemove) || List(),
      message: state.message || ''
    }
  };
}
