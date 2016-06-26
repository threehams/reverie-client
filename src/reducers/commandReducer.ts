import { Action } from 'redux-actions';
import { Set } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  COMMAND_CLOSE_AUTOCOMPLETE,
  COMMAND_COMPLETE,
  COMMAND_HISTORY_CLEAR,
  COMMAND_SELECT_AUTOCOMPLETE_ITEM,
  COMMAND_SEND,
  COMMAND_SET_CURRENT,
  COMMAND_SET_CURSOR_INDEX,
} from '../actions/commandActions';
import { SET_STATE } from '../actions/messageActions';
import { CommandState } from '../records';

export const INITIAL_STATE: CommandState = new CommandState();

export default handleActions({
  [COMMAND_HISTORY_CLEAR]: (state: CommandState, action: Action<{}>) => {
    return state.update('history', history => history.clear());
  },
  [COMMAND_SEND]: (state: CommandState, action: Action<COMMAND_SEND>) => {
    return closeAutocomplete(state.update('history', history => history.push(action.payload.command))
      .merge({ current: '', cursorIndex: 0 }));
  },
  [COMMAND_COMPLETE]: (state: CommandState, action: Action<COMMAND_COMPLETE>) => {
    if (!state.autocompleteOpen) {
      return state;
    }
    return completeCommand(state, action.payload);
  },
  [COMMAND_CLOSE_AUTOCOMPLETE]: (state: CommandState, action: Action<COMMAND_CLOSE_AUTOCOMPLETE>) => {
    return closeAutocomplete(state);
  },
  [COMMAND_SELECT_AUTOCOMPLETE_ITEM]: (state: CommandState, action: Action<COMMAND_SELECT_AUTOCOMPLETE_ITEM>) => {
    return state.set('autocompleteSelectedItem', action.payload.item);
  },
  [COMMAND_SEND]: (state: CommandState, action: Action<COMMAND_SEND>) => {
    return closeAutocomplete(state.update('history', history => history.push(action.payload.command))
      .merge({ current: '', cursorIndex: 0 }));
  },
  [COMMAND_SET_CURRENT]: (state: CommandState, action: Action<COMMAND_SET_CURRENT>) => {
    return setCurrentCommand(state, action.payload);
  },
  [COMMAND_SET_CURSOR_INDEX]: (state: CommandState, action: Action<COMMAND_SET_CURSOR_INDEX>) => {
    return setCursorIndex(state, action.payload.cursorIndex);
  },
  [SET_STATE]: (state: CommandState, action: Action<SET_STATE>) => {
    return state.update('available', available => {
      return available.union(Set(action.payload.availableCommands));
    });
  },
}, INITIAL_STATE);

function setCursorIndex(state: CommandState, index: number) {
  const currentIndex = state.cursorIndex;
  const indexSet = state.set('cursorIndex', index);
  if (!state.autocompleteOpen || Math.abs(currentIndex - index) > 1 || state.current[index] === ' ') {
    return closeAutocomplete(indexSet);
  }
  return indexSet;
}

function completeCommand(state: CommandState, { command, cursorIndex, autocompleteItem }) {
  return replaceCommand(state, command, cursorIndex, autocompleteItem);
}

function replaceCommand(state: CommandState, command: string, index: number, replacement: string) {
  // Slice in half at index
  const tail = command.slice(index);
  const head = command.slice(0, index);
  const lastSpace = head.lastIndexOf(' ') + 1;
  // Remove the expected autocomplete fragment from head, replace with replacement, tack on tail
  const cursorIndex = lastSpace + replacement.length + 1;
  return state.merge({
    autocompletePosition: cursorIndex,
    current: head.slice(0, lastSpace) + replacement + (tail[0] === ' ' ? '' : ' ') + tail,
    cursorIndex,
  });
}

function closeAutocomplete(state: CommandState) {
  return state.merge({ autocompleteOpen: false, autocompletePosition: null, autocompleteSelectedItem: null });
}

function setCurrentCommand(state: CommandState, { command, cursorIndex }) {
  const currentCommand = state.get('current');
  const newState = state.merge({ current: command, cursorIndex });
  if (command[cursorIndex - 1] === ' ' || currentCommand.length > command.length) {
    return closeAutocomplete(newState);
  }

  const position = state.get('autocompletePosition');
  return newState.merge({
    autocompleteOpen: true,
    autocompletePosition: position ? position : cursorIndex,
  });
}
