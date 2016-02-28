export function clear() {
  return {
    type: 'HISTORY_CLEAR'
  };
}

export function setCurrentCommand(command) {
  return {
    type: 'COMMAND_SET_CURRENT',
    payload: {
      command: command
    }
  };
}

export function sendCommand(command) {
  return {
    type: 'COMMAND_SEND',
    payload: {
      command: command
    }
  };
}
