import { Map } from 'immutable';
import { Entity } from '../records';

import {
  Action,
  SET_STATE,
} from '../actions/actionTypes';

export const INITIAL_STATE: Map<string, Entity> = Map({});

export default function entitiesReducer(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case SET_STATE:
      const entities = state.merge(action.payload.entities);
      return action.payload.entitiesToRemove.reduce((newEntities: Map<string, Entity>, toRemove: string) => {
        return newEntities.remove(toRemove);
      }, entities);
    default:
      return state;
  }
}
