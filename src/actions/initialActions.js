import { fromJS, List, Map } from 'immutable';
import {
  SET_STATE
} from './actionTypes';

function filterPlayer(player, location, entities) {
  if (!location) {
    return entities;
  }
  return entities.updateIn([location.get('id'), 'entities'], (subEntities) => {
    return subEntities.filter(entity => entity !== player);
  });
}

export function setState(state) {
  return (dispatch, getState) => {
    const prevState = getState();
    const player = state.player || prevState.getIn(['ui', 'player']);
    const newEntities = fromJS(state.entities) || Map();
    const location = newEntities.find(entity => entity.get('entities') && entity.get('entities').contains(player));
    const withoutPlayer = filterPlayer(player, location, newEntities);

    dispatch({
      type: SET_STATE,
      payload: {
        player: state.player,
        location: location && location.get('id'),
        entities: withoutPlayer,
        entitiesToRemove: fromJS(state.entitiesToRemove) || List(),
        message: state.message || '',
        availableCommands: List(state.availableCommands) || List()
      }
    });
  };
}

export function setInitialState(state) {
  return (dispatch, getState) => {
    const currentState = getState();
    if (currentState.getIn(['ui', 'player'])) return;

    dispatch(setState(state));
  };
}
