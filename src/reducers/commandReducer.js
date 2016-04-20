import { Set } from 'immutable';

import {
  COMMAND_CLOSE_AUTOCOMPLETE,
  COMMAND_SELECT_AUTOCOMPLETE_ITEM,
  COMMAND_SET_CURSOR_INDEX,
  COMMAND_COMPLETE,
  COMMAND_SEND,
  COMMAND_HISTORY_CLEAR,
  COMMAND_SET_CURRENT,
  SET_STATE,
} from '../actions/actionTypes';
import CommandRecord from '../records/CommandRecord';
import CommandPartRecord from '../records/CommandPartRecord';
import AllowedRecord from '../records/AllowedRecord';
import CommandStateRecord from '../records/CommandStateRecord';

export default function commandReducer(state = new CommandStateRecord(), action) {
  switch (action.type) {
    case COMMAND_CLOSE_AUTOCOMPLETE:
      return closeAutocomplete(state);
    case COMMAND_COMPLETE:
      if (!state.autocompleteOpen) return state;
      return completeCommand(state, action.payload);
    case COMMAND_HISTORY_CLEAR:
      return state.update('history', history => history.clear());
    case COMMAND_SELECT_AUTOCOMPLETE_ITEM:
      return state.set('autocompleteSelectedItem', action.payload.item);
    case COMMAND_SEND:
      return closeAutocomplete(state.update('history', history => history.push(action.payload.command))
        .merge({ current: '', cursorIndex: 0 }));
    case COMMAND_SET_CURRENT:
      return setCurrentCommand(state, action.payload);
    case COMMAND_SET_CURSOR_INDEX:
      return setCursorIndex(state, action.payload.cursorIndex);
    case SET_STATE:
      return state.update('available', available => {
        if (!action.payload.availableCommands.size) return available;
        const newAvailable = action.payload.availableCommands.map(command => createCommandRecord(command));
        return available.union(new Set(newAvailable));
      });
    default:
      return state;
  }
}

function createCommandRecord(command) {
  const nestedRecord = command.update('parts', parts => {
    return parts.map(part => {
      const allowedRecord = part.update('allowed', allowed => {
        return allowed.map(allow => {
          return new AllowedRecord({
            types: Set(allow.get('types')),
            components: Set(allow.get('components')),
            owners: Set(allow.get('owners')),
            names: Set(allow.get('names')),
          });
        });
      });
      return new CommandPartRecord(allowedRecord);
    });
  });
  return new CommandRecord(nestedRecord);
}

function setCursorIndex(state, index) {
  const currentIndex = state.cursorIndex;
  const indexSet = state.set('cursorIndex', index);
  if (!state.autocompleteOpen || Math.abs(currentIndex - index) > 1 || state.current[index] === ' ') {
    return closeAutocomplete(indexSet);
  }
  return indexSet;
}

function completeCommand(state, { command, cursorIndex, autocompleteItem }) {
  return replaceCommand(state, command, cursorIndex, autocompleteItem);
}

function replaceCommand(state, command, index, replacement) {
  // Slice in half at index
  const tail = command.slice(index);
  const head = command.slice(0, index);
  const lastSpace = head.lastIndexOf(' ') + 1;
  // Remove the expected autocomplete fragment from head, replace with replacement, tack on tail
  return state.merge({
    current: head.slice(0, lastSpace) + replacement + (tail[0] === ' ' ? '' : ' ') + tail,
    cursorIndex: lastSpace + replacement.length + 1
  });
}

function closeAutocomplete(state) {
  return state.merge({ autocompleteOpen: false, autocompleteSelectedItem: null });
}

function setCurrentCommand(state, { command, cursorIndex }) {
  const currentCommand = state.get('current');
  const newState = state.merge({ current: command, cursorIndex });
  if (command[cursorIndex - 1] === ' ' || currentCommand.length > command.length) {
    return closeAutocomplete(newState);
  }
  return newState.merge({
    autocompleteOpen: true
  });
}
