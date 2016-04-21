import {
  SET_STATE
} from '../actions/actionTypes';
import LocationReducer from '../records/LocationRecord';

export default function locationReducer(state = new LocationReducer(), action) {
  switch (action.type) {
    case SET_STATE:
      return state.merge(action.payload.location);
    default:
      return state;
  }
}
