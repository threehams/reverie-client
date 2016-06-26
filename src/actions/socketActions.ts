import { Action } from 'redux-actions';

export const SOCKET_STATUS = 'SOCKET_STATUS';
export type SOCKET_STATUS = {
  status: string;
};

export const disconnected = (): Action<SOCKET_STATUS> => ({
  payload: {
    status: 'disconnected',
  },
  type: SOCKET_STATUS,
});

export const reconnected = (): Action<SOCKET_STATUS> => ({
  payload: {
    status: 'reconnected',
  },
  type: SOCKET_STATUS,
});
