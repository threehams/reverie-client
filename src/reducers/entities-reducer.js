import {Map} from 'immutable';
import EntityRecord from '../records/entity-record';

import {
  SET_STATE
} from '../actions/action-types';

export default function entitiesReducer(state = Map(), action) {
  switch (action.type) {
    case SET_STATE:
      const entities = state.merge(action.payload.entities.map(entity => new EntityRecord(entity)));
      return action.payload.entitiesToRemove.reduce((newEntities, toRemove) => {
        return newEntities.remove(toRemove);
      }, entities);
    default:
      return state;
  }
}
