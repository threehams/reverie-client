import { Action } from 'redux-actions';
import { List } from 'immutable';

import { AutocompleteItem } from '../records';

export const COMMAND_HISTORY_CLEAR = 'COMMAND_HISTORY_CLEAR';
export type COMMAND_HISTORY_CLEAR = {};
export const COMMAND_SEND = 'COMMAND_SEND';
export type COMMAND_SEND = {
  command: string;
};
export const COMMAND_COMPLETE = 'COMMAND_COMPLETE';
export type COMMAND_COMPLETE = {
  command: string;
  cursorIndex: number;
  autocompleteItem: string;
};
export const COMMAND_CLOSE_AUTOCOMPLETE = 'COMMAND_CLOSE_AUTOCOMPLETE';
export type COMMAND_CLOSE_AUTOCOMPLETE = {};
export const COMMAND_SELECT_AUTOCOMPLETE_ITEM = 'COMMAND_SELECT_AUTOCOMPLETE_ITEM';
export type COMMAND_SELECT_AUTOCOMPLETE_ITEM = {
  item: AutocompleteItem;
}
export const COMMAND_SET_CURRENT = 'COMMAND_SET_CURRENT';
export type COMMAND_SET_CURRENT = {
  command: string;
  cursorIndex: number;
};
export const COMMAND_SET_CURSOR_INDEX = 'COMMAND_SET_CURSOR_INDEX';
export type COMMAND_SET_CURSOR_INDEX = {
  cursorIndex: number;
};

export const clear = (): Action<COMMAND_HISTORY_CLEAR> => ({
  payload: {},
  type: COMMAND_HISTORY_CLEAR,
});

export const sendCommand = (command: string): Action<COMMAND_SEND> => ({
  meta: {
    socket: true,
  },
  payload: {
    command,
  },
  type: COMMAND_SEND,
});

export const completeCommand = (
  command: string,
  cursorIndex: number,
  autocompleteItem: AutocompleteItem
): Action<any> => ({
  payload: {
    command,
    cursorIndex,
    autocompleteItem: autocompleteItem.path || autocompleteItem.name,
  },
  type: COMMAND_COMPLETE,
});

export const setCursorIndex = (cursorIndex: number): Action<COMMAND_SET_CURSOR_INDEX> => ({
  payload: {
    cursorIndex,
  },
  type: COMMAND_SET_CURSOR_INDEX,
});

export const setCurrentCommand = (command: string, cursorIndex: number): Action<COMMAND_SET_CURRENT> => ({
  payload: {
    command,
    cursorIndex,
  },
  type: COMMAND_SET_CURRENT,
});

export const selectNextAutocompleteItem = (options: List<AutocompleteItem>, current: AutocompleteItem) => {
  const index: number = options.findIndex(option => option === current);
  const item: AutocompleteItem = index === options.size - 1 ? options.first() : options.get(index + 1);
  return selectAutocompleteItem(item);
};

export const selectPreviousAutocompleteItem = (options: List<AutocompleteItem>, current: AutocompleteItem) => {
  const index = options.findIndex(option => option === current);
  const item = index === 0 ? options.last() : options.get(index - 1);
  return selectAutocompleteItem(item);
};

export const selectAutocompleteItem = (item: AutocompleteItem): Action<COMMAND_SELECT_AUTOCOMPLETE_ITEM> => ({
  payload: {
    item,
  },
  type: COMMAND_SELECT_AUTOCOMPLETE_ITEM,
});

export const closeAutocomplete = (): Action<COMMAND_CLOSE_AUTOCOMPLETE> => ({
  payload: {},
  type: COMMAND_CLOSE_AUTOCOMPLETE,
});
