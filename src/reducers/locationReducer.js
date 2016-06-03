import {
  SET_STATE
} from '../actions/actionTypes';
import LocationReducer from '../records/LocationRecord';

export const INITIAL_STATE = new LocationReducer();

export default function locationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_STATE:
      return state.merge(action.payload.location);
    default:
      return state;
  }
}
