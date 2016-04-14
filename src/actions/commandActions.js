import socket from '../socket';
import {
  COMMAND_SEND,
  COMMAND_SET_CURRENT,
  COMMAND_HISTORY_CLEAR
} from './actionTypes';

export function sendCommand(command) {
  return (dispatch) => {
    socket.send(JSON.stringify({
      command: command
    }));
    dispatch({
      type: COMMAND_SEND,
      payload: {
        command: command
      }
    });
  };
}

export function setCurrentCommand(command, closeAutocomplete) {
  return {
    type: COMMAND_SET_CURRENT,
    payload: {
      command: command,
      closeAutocomplete: closeAutocomplete
    }
  };
}

export function clear() {
  return {
    type: COMMAND_HISTORY_CLEAR
  };
}
