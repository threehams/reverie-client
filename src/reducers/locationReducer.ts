import { Action, handleActions } from 'redux-actions';
import { SET_STATE } from '../actions/messageActions';
import { Location } from '../records';

export const INITIAL_STATE: Location = new Location();

export default handleActions({
  [SET_STATE]: (state: Location, action: Action<SET_STATE>) => {
    return state.merge(action.payload.location);
  },
}, INITIAL_STATE);
