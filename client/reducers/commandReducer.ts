import { Set } from 'immutable';

import {
  CommandCloseAutocomplete,
  CommandComplete,
  CommandHistoryClear,
  CommandSelectAutocompleteItem,
  CommandSend,
  CommandSetCurrent,
  CommandSetCursorIndex,
} from '../actions/commandActions';
import { SetState } from '../actions/messageActions';
import { CommandState } from '../records';

export const INITIAL_STATE: CommandState = new CommandState();

type CommandAction = CommandCloseAutocomplete |
  CommandComplete |
  CommandHistoryClear |
  CommandSelectAutocompleteItem |
  CommandSend |
  CommandSetCurrent |
  CommandSetCursorIndex |
  SetState;

export const commandReducer = (state = INITIAL_STATE, action: CommandAction) => {
  switch (action.type) {
    case 'COMMAND_HISTORY_CLEAR':
      return state.update('history', (history) => history.clear());
    case 'COMMAND_SEND':
      return sendCommand(state, action);
    case 'COMMAND_COMPLETE':
      if (!state.autocompleteOpen) {
        return state;
      }
      return completeCommand(state, action);
    case 'COMMAND_CLOSE_AUTOCOMPLETE':
      return closeAutocomplete(state);
    case 'COMMAND_SELECT_AUTOCOMPLETE_ITEM':
      return state.set('autocompleteSelectedItem', action.payload.item);
    case 'COMMAND_SET_CURRENT':
      return setCurrentCommand(state, action);
    case 'COMMAND_SET_CURSOR_INDEX':
      return setCursorIndex(state, action.payload.cursorIndex);
    case 'SET_STATE':
      return setState(state, action);
    default:
      return state;
  }
};

function setState(state: CommandState, action: SetState) {
  return state.update('available', (available) => {
    return available.union(Set(action.payload.availableCommands));
  });
}

function sendCommand(state: CommandState, action: CommandSend) {
  return closeAutocomplete(state.update('history', (history) => history.push(action.payload.command))
    .merge({ current: '', cursorIndex: 0 }));
}

function setCursorIndex(state: CommandState, index: number) {
  const currentIndex = state.cursorIndex;
  const indexSet = state.set('cursorIndex', index);
  if (!state.autocompleteOpen || Math.abs(currentIndex - index) > 1 || state.current[index] === ' ') {
    return closeAutocomplete(indexSet);
  }
  return indexSet;
}

function completeCommand(
  state: CommandState,
  {
    payload: {
      command,
      cursorIndex,
      autocompleteItem,
    },
  }: CommandComplete,
) {
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

function setCurrentCommand(state: CommandState, { payload: { command, cursorIndex } }: CommandSetCurrent) {
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
