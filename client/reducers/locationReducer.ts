import { SetState } from '../actions/messageActions';
import { Entity } from '../records';

export const INITIAL_STATE: Entity = new Entity();

export const locationReducer = (state = INITIAL_STATE, action: SetState) => {
  switch (action.type) {
    case 'SET_STATE':
      return state.merge(action.payload.location);
    default:
      return state;
  }
};
