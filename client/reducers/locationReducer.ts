import { SetState } from '../actions/messageActions';
import { Location } from '../records';

export const INITIAL_STATE: Location = new Location();

export const locationReducer = (state = INITIAL_STATE, action: SetState) => {
  switch (action.type) {
    case 'SET_STATE':
      return state.merge(action.payload.location);
    default:
      return state;
  }
};
