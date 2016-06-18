import { RESIZE_PANEL } from './actionTypes';

export const resizePanel = (property, size) => ({
  payload: {
    property,
    size,
  },
  type: RESIZE_PANEL,
});
