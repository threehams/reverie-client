import socket from '../socket';
import {
  COMMAND_COMPLETE,
  COMMAND_SELECT_AUTOCOMPLETE_ITEM,
  COMMAND_SEND,
  COMMAND_SET_CURRENT,
  COMMAND_SET_CURSOR_INDEX,
  COMMAND_HISTORY_CLEAR
} from './actionTypes';

export function clear() {
  return {
    type: COMMAND_HISTORY_CLEAR
  };
}

export function sendCommand(command) {
  return (dispatch) => {
    socket.send(JSON.stringify({
      command: command
    }));
    dispatch({
      type: COMMAND_SEND,
      payload: {
        command
      }
    });
  };
}

export function completeCommand(command, cursorIndex, autocompleteItem) {
  return {
    type: COMMAND_COMPLETE,
    payload: {
      command: command,
      cursorIndex,
      autocompleteItem: autocompleteItem.name
    }
  };
}

export function setCursorIndex(cursorIndex) {
  return {
    type: COMMAND_SET_CURSOR_INDEX,
    payload: {
      cursorIndex
    }
  };
}

export function setCurrentCommand(command, cursorIndex) {
  return {
    type: COMMAND_SET_CURRENT,
    payload: {
      command,
      cursorIndex
    }
  };
}

export function selectNextAutocompleteItem(options, current) {
  const index = options.findIndex(option => option === current);
  const item = index === options.size - 1 ? options.first() : options.get(index + 1);
  return {
    type: COMMAND_SELECT_AUTOCOMPLETE_ITEM,
    payload: {
      item: item
    }
  };
}

export function selectPreviousAutocompleteItem(options, current) {
  const index = options.findIndex(option => option === current);
  const item = index === 0 ? options.last() : options.get(index - 1);
  return {
    type: COMMAND_SELECT_AUTOCOMPLETE_ITEM,
    payload: {
      item: item
    }
  };
}
