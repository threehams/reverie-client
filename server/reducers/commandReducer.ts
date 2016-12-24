import { CommandState } from '../records';

import { SetState } from '../actions/messageActions';

export const INITIAL_STATE: CommandState = new CommandState();

export default (state = INITIAL_STATE, action: SetState) => {
  switch (action.type) {
    case 'SET_STATE':
      return state.set('available', action.payload.availableCommands);
    default:
      return state;
  }
};
