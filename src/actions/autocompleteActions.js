import {
  AUTOCOMPLETE_SET_INDEX,
  AUTOCOMPLETE_SEND_COMMAND
} from './actionTypes';

export function selectNext(options, currentIndex) {
  const index = options.size === (currentIndex + 1) ? 0 : currentIndex + 1;
  return {
    type: AUTOCOMPLETE_SET_INDEX,
    payload: {
      index: index
    }
  };
}

export function selectPrevious(options, currentIndex) {
  const index = currentIndex === 0 ? options.size - 1 : currentIndex - 1;
  return {
    type: AUTOCOMPLETE_SET_INDEX,
    payload: {
      index: index
    }
  };
}

export function send(command) {
  return {
    type: AUTOCOMPLETE_SEND_COMMAND,
    payload: {
      command: command
    }
  };
}
