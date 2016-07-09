import { List } from 'immutable';

import { EditorHistoryClear } from '../actions/editorActions';
import { SetState } from '../actions/messageActions';

type State = List<string>;
export const INITIAL_STATE: State = List([]);
type Actions = SetState | EditorHistoryClear;

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case 'EDITOR_HISTORY_CLEAR':
      return state.clear();
    case 'SET_STATE':
      if (!action.payload.message) { return state; }
      return state.concat(`${state.size ? '\n' : ''}${action.payload.message}`.split('\n'));
    default:
      return state;
  }
};
