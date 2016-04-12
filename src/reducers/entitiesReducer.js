import {Map} from 'immutable';

import {
  SET_STATE
} from '../actions/actionTypes';

export default function entitiesReducer(state = Map(), action) {
  switch (action.type) {
    case SET_STATE:
      const entities = state.merge(action.payload.entities);
      return action.payload.entitiesToRemove.reduce((newEntities, toRemove) => {
        return newEntities.remove(toRemove);
      }, entities);
    default:
      return state;
  }
}
