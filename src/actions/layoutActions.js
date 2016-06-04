import { RESIZE_PANEL } from './actionTypes';

export const resizePanel = (property, size) => ({
  type: RESIZE_PANEL,
  payload: {
    property,
    size
  }
});
