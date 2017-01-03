import { List } from 'immutable';
import { Dispatch } from 'redux';

import * as entityActions from '../actions/entityActions';
import { Command, EntityState, State } from '../records';

export interface SetState {
  type: 'SET_STATE';
  payload: {
    availableCommands?: Set<Command>;
    entities?: EntityState;
    entitiesToRemove?: List<string>;
  };
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
      sendMessage(userId, `I don\'t know how to ${parts[0]}.`);
      return;
    }

    // TODO remove assertion after redux-thunk typings are fixed
    // tslint:disable-next-line no-any
    dispatch<any>(entityActions.move(parts[1], parts[3], state.entities));
  };
}
