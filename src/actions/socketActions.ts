import { SOCKET_STATUS } from './actionTypes';

export const disconnected = () => ({
  payload: {
    status: 'disconnected',
  },
  type: SOCKET_STATUS,
});

export const reconnected = () => ({
  payload: {
    status: 'reconnected',
  },
  type: SOCKET_STATUS,
});
