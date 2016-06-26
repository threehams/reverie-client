import { Action, handleActions } from 'redux-actions';
import { List } from 'immutable';

import { EDITOR_HISTORY_CLEAR } from '../actions/editorActions';
import { SET_STATE } from '../actions/messageActions';

type State = List<string>;
export const INITIAL_STATE: State = List([]);

export default handleActions({
  [EDITOR_HISTORY_CLEAR]: (state: State, action: Action<EDITOR_HISTORY_CLEAR>) => {
    return state.clear();
  },
  [SET_STATE]: (state: State, action: Action<SET_STATE>) => {
    if (!action.payload.message) { return state; }
    return state.concat(`${state.size ? '\n' : ''}${action.payload.message}`.split('\n'));
  },
}, INITIAL_STATE);
