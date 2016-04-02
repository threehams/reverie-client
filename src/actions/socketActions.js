import { SOCKET_STATUS } from './actionTypes';

export function disconnected() {
  return {
    type: SOCKET_STATUS,
    payload: {
      status: 'disconnected'
    }
  };
}

export function reconnected() {
  return {
    type: SOCKET_STATUS,
    payload: {
      status: 'reconnected'
    }
  };
}
