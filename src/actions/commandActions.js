import socket from '../socket';
import {
  COMMAND_CLOSE_AUTOCOMPLETE,
  COMMAND_COMPLETE,
  COMMAND_SELECT_AUTOCOMPLETE_ITEM,
  COMMAND_SEND,
  COMMAND_SET_CURRENT,
  COMMAND_SET_CURSOR_INDEX,
  COMMAND_HISTORY_CLEAR
} from './actionTypes';

export const clear = () => ({
  type: COMMAND_HISTORY_CLEAR
});

export const sendCommand = (command) => {
  return (dispatch) => {
    socket.send(JSON.stringify({
      command
    }));
    dispatch({
      type: COMMAND_SEND,
      payload: {
        command
      }
    });
  };
};

export const completeCommand = (command, cursorIndex, autocompleteItem) => ({
  type: COMMAND_COMPLETE,
  payload: {
    command,
    cursorIndex,
    autocompleteItem: autocompleteItem.path || autocompleteItem.name
  }
});

export const setCursorIndex = (cursorIndex) => ({
  type: COMMAND_SET_CURSOR_INDEX,
  payload: {
    cursorIndex
  }
});

export const setCurrentCommand = (command, cursorIndex) => ({
  type: COMMAND_SET_CURRENT,
  payload: {
    command,
    cursorIndex
  }
});

export const selectNextAutocompleteItem = (options, current) => {
  const index = options.findIndex(option => option === current);
  const item = index === options.size - 1 ? options.first() : options.get(index + 1);
  return selectAutocompleteItem(item);
};

export const selectPreviousAutocompleteItem = (options, current) => {
  const index = options.findIndex(option => option === current);
  const item = index === 0 ? options.last() : options.get(index - 1);
  return selectAutocompleteItem(item);
};

export const selectAutocompleteItem = (item) => ({
  type: COMMAND_SELECT_AUTOCOMPLETE_ITEM,
  payload: {
    item
  }
});

export const closeAutocomplete = () => ({
  type: COMMAND_CLOSE_AUTOCOMPLETE
});
