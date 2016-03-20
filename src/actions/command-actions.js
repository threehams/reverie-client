import socket from '../socket';
import {
  COMMAND_SEND,
  COMMAND_SET_CURRENT,
} from './action-types';

export function sendCommand(command) {
  return (dispatch) => {
    socket.send(command);
    dispatch({
      type: COMMAND_SEND,
      payload: {
        command: command
      }
    });
  };
}

export function setCurrentCommand(command) {
  return {
    type: COMMAND_SET_CURRENT,
    payload: {
      command: command
    }
  };
}
