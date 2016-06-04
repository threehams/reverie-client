import { SOCKET_STATUS } from './actionTypes';

export const disconnected = () => ({
  type: SOCKET_STATUS,
  payload: {
    status: 'disconnected'
  }
});

export const reconnected = () => ({
  type: SOCKET_STATUS,
  payload: {
    status: 'reconnected'
  }
});
