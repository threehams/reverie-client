import { Map, Set } from 'immutable';
import { EntityRecord, EntityType } from '../records/EntityRecord';

import {
  SET_STATE,
} from '../actions/actionTypes';

export const INITIAL_STATE: Map<string, EntityType> = Map({});

export default function entitiesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_STATE:
      const entities = state.merge(action.payload.entities.map((entity) => {
        const newEntity = entity
          .update('components', components => Set(components))
          .update('states', states => Set(states));
        return new EntityRecord(newEntity);
      }));
      return action.payload.entitiesToRemove.reduce((newEntities, toRemove) => {
        return newEntities.remove(toRemove);
      }, entities);
    default:
      return state;
  }
}
