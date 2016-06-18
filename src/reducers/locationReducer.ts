import { SET_STATE } from '../actions/actionTypes';
import { Location } from '../records/LocationRecord';

export const INITIAL_STATE: Location = new Location();

export default function locationReducer(state = INITIAL_STATE, action): Location {
  switch (action.type) {
    case SET_STATE:
      return state.merge(action.payload.location);
    default:
      return state;
  }
}
