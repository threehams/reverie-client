import {fromJS, List } from 'immutable';
import { normalize, arrayOf, Schema } from 'normalizr';
import LocationRecord from '../records/locationRecord';
import EntityRecord from '../records/entityRecord';

import {
  SET_STATE
} from './actionTypes';


export function setState(message) {
  const state = transform(message.payload);

  return {
    type: SET_STATE,
    payload: {
      player: state.player,
      location: state.location ? new LocationRecord(state.location) : undefined,
      entities: state.entities ? state.entities.map(entity => new EntityRecord(entity)) : List(),
      entitiesToRemove: fromJS(state.entitiesToRemove) || List(),
      message: state.message || ''
    }
  };
}

export function setInitialState(message) {
  return (dispatch, getState) => {
    const currentState = getState();
    if (currentState.getIn(['ui', 'player'])) return;

    dispatch(setState(message));
  };
}

const entitySchema = new Schema('entities');
entitySchema.define({
  entities: arrayOf(entitySchema)
});

function transform(data) {
  const normalized = normalize(data, {
    entities: arrayOf(entitySchema),
    location: {
      entities: arrayOf(entitySchema)
    }
  });
  return {
    player: normalized.result.player,
    location: fromJS(normalized.result.location),
    message: normalized.result.message,
    entities: fromJS(normalized.entities.entities)
  };
}
