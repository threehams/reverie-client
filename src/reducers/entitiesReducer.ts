import { Map, Set } from 'immutable';
import { Entity } from '../records';

import {
  SET_STATE,
} from '../actions/actionTypes';

export const INITIAL_STATE: Map<string, Entity> = Map({});

export default function entitiesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_STATE:
      const entities = state.merge(action.payload.entities.map((entity) => {
        const newEntity = entity
          .update('components', components => Set(components))
          .update('states', states => Set(states));
        return new Entity(newEntity);
      }));
      return action.payload.entitiesToRemove.reduce((newEntities, toRemove) => {
        return newEntities.remove(toRemove);
      }, entities);
    default:
      return state;
  }
}
