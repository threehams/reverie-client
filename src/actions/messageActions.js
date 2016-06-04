import { fromJS, List, Map, Set } from 'immutable';
import {
  SET_STATE
} from './actionTypes';
import LocationRecord from '../records/LocationRecord';

export const setState = (state) => {
  return (dispatch, getState) => {
    const prevState = getState();

    dispatch({
      type: SET_STATE,
      payload: {
        player: state.player || prevState.getIn(['ui', 'player']),
        location: state.location && new LocationRecord(fromJS(state.location)),
        entities: fromJS(state.entities) || Map(),
        entitiesToRemove: fromJS(state.entitiesToRemove) || List(),
        message: state.message || '',
        statusEffects: state.statusEffects && Set(state.statusEffects),
        availableCommands: fromJS(state.availableCommands) || List(),
      }
    });
  };
};

export const setInitialState = (state) => {
  return (dispatch, getState) => {
    const currentState = getState();
    if (currentState.getIn(['ui', 'player'])) return;

    dispatch(setState(state));
  };
};
