import {fromJS, List, Map} from 'immutable';

import {
  SET_STATE,
  MERGE_STATE
} from './action-types';

export function setState(state) {
  return {
    type: SET_STATE,
    payload: {
      player: fromJS(state.player),
      entities: fromJS(state.entities)
    }
  };
}

export function mergeState(state) {
  return {
    type: MERGE_STATE,
    payload: {
      entities: fromJS(state.entities) || Map(),
      entitiesToRemove: fromJS(state.entitiesToRemove) || List(),
      message: state.message || ''
    }
  };
}
