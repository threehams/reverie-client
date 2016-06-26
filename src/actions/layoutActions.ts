import { Action } from 'redux-actions';

export const RESIZE_PANEL = 'RESIZE_PANEL';
export type RESIZE_PANEL = { property: string, size: number };

export const resizePanel = (property: string, size: number): Action<RESIZE_PANEL> => ({
  payload: {
    property,
    size,
  },
  type: RESIZE_PANEL,
});
