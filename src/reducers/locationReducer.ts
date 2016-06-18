import { SET_STATE } from '../actions/actionTypes';
import { LocationRecord, LocationType } from '../records/LocationRecord';

export const INITIAL_STATE: LocationType = new LocationRecord();

export default function locationReducer(state = INITIAL_STATE, action): LocationType {
  switch (action.type) {
    case SET_STATE:
      return state.merge(action.payload.location);
    default:
      return state;
  }
}
