import { Dispatch } from 'redux';

import { State, StateDelta } from '../records';
import * as entityActions from '../actions/entityActions';

export interface SetState {
  type: 'SET_STATE';
  payload: StateDelta;
};

export interface SendMessage {
  type: 'SEND_MESSAGE';
  payload: {
    message: string;
  };
}

export function sendMessage(id: string, message: string): SendMessage {
  return {
    payload: {
      message,
    },
    type: 'SEND_MESSAGE',
  };
}

type Actions = entityActions.MoveEntity;

/*
 * Parses a command from the server.  
 */
export function parseCommand(command: string, userId: string) {
  return (dispatch: Dispatch<Actions>, getState: () => State): void => {
    const parts = command.split(' ');
    const state = getState();
    const root = state.command.available.find(availableCommand => availableCommand.name === parts[0]);
    if (!root) {
      dispatch( sendMessage(userId, `I don\'t know how to ${parts[0]}.`) );
      return;
    }

    // delegate to other action creators?
    dispatch(entityActions.move('1', '2'));
  };
}
