import { List } from 'immutable';

import socket from '../socket';
import {
  Action,
  AutocompleteOption,
  COMMAND_CLOSE_AUTOCOMPLETE,
  COMMAND_COMPLETE,
  COMMAND_HISTORY_CLEAR,
  COMMAND_SELECT_AUTOCOMPLETE_ITEM,
  COMMAND_SEND,
  COMMAND_SET_CURRENT,
  COMMAND_SET_CURSOR_INDEX,
} from './actionTypes';

export const clear = (): Action => ({
  type: COMMAND_HISTORY_CLEAR,
});

export const sendCommand = (command: string) => {
  return (dispatch) => {
    socket.send(JSON.stringify({
      command,
    }));
    dispatch({
      payload: {
        command,
      },
      type: COMMAND_SEND,
    });
  };
};

export const completeCommand = (
  command: string,
  cursorIndex: number,
  autocompleteItem: AutocompleteOption
): Action => ({
  payload: {
    command,
    cursorIndex,
    autocompleteItem: autocompleteItem.path || autocompleteItem.name,
  },
  type: COMMAND_COMPLETE,
});

export const setCursorIndex = (cursorIndex): Action => ({
  payload: {
    cursorIndex,
  },
  type: COMMAND_SET_CURSOR_INDEX,
});

export const setCurrentCommand = (command, cursorIndex): Action => ({
  payload: {
    command,
    cursorIndex,
  },
  type: COMMAND_SET_CURRENT,
});

export const selectNextAutocompleteItem = (options: List<AutocompleteOption>, current: AutocompleteOption): Action => {
  const index: number = options.findIndex(option => option === current);
  const item: AutocompleteOption = index === options.size - 1 ? options.first() : options.get(index + 1);
  return selectAutocompleteItem(item);
};

export const selectPreviousAutocompleteItem = (options, current): Action => {
  const index = options.findIndex(option => option === current);
  const item = index === 0 ? options.last() : options.get(index - 1);
  return selectAutocompleteItem(item);
};

export const selectAutocompleteItem = (item): Action => ({
  payload: {
    item,
  },
  type: COMMAND_SELECT_AUTOCOMPLETE_ITEM,
});

export const closeAutocomplete = (): Action => ({
  type: COMMAND_CLOSE_AUTOCOMPLETE,
});
