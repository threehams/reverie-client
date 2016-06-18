import { fromJS, List, Map, Set } from 'immutable';
import {
  SET_STATE,
} from './actionTypes';
import { Location } from '../records';

export const setState = (state) => {
  return (dispatch, getState) => {
    const prevState = getState();

    dispatch({
      payload: {
        availableCommands: fromJS(state.availableCommands) || List(),
        entities: fromJS(state.entities) || Map(),
        entitiesToRemove: fromJS(state.entitiesToRemove) || List(),
        location: state.location && new Location(fromJS(state.location)),
        message: state.message || '',
        player: state.player || prevState.getIn(['ui', 'player']),
        statusEffects: state.statusEffects && Set(state.statusEffects),
      },
      type: SET_STATE,
    });
  };
};

export const setInitialState = (state) => {
  return (dispatch, getState) => {
    const currentState = getState();
    if (currentState.getIn(['ui', 'player'])) {
      return;
    }

    dispatch(setState(state));
  };
};
