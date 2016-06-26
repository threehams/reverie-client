import { Action, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { Entity } from '../records';

import { SET_STATE } from '../actions/messageActions';

type EntityObjectMap = Map<string, Entity>;
export const INITIAL_STATE: EntityObjectMap = Map({});

export default handleActions({
  [SET_STATE]: (state: EntityObjectMap, action: Action<SET_STATE>) => {
    const entities = state.merge(action.payload.entities);
    return action.payload.entitiesToRemove.reduce((newEntities: Map<string, Entity>, toRemove: string) => {
      return newEntities.remove(toRemove);
    }, entities);
  },
}, INITIAL_STATE);
