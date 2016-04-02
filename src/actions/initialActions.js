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

export function setInitialState(state) {
  return (dispatch, getState) => {
    const currentState = getState();
    if (currentState.getIn(['ui', 'player'])) return;

    dispatch(setState(state));
  };
}
