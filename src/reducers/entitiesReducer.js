import {Map, Set} from 'immutable';
import EntityRecord from '../records/EntityRecord';

import {
  SET_STATE
} from '../actions/actionTypes';

export default function entitiesReducer(state = Map(), action) {
  switch (action.type) {
    case SET_STATE:
      const entities = state.merge(action.payload.entities.map(entity => {
        const newEntity = entity.update('components', components => Set(components));
        return new EntityRecord(newEntity);
      }));
      return action.payload.entitiesToRemove.reduce((newEntities, toRemove) => {
        return newEntities.remove(toRemove);
      }, entities);
    default:
      return state;
  }
}
