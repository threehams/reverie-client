import { RESIZE_PANEL } from './actionTypes';

export function resizePanel(property, size) {
  return {
    type: RESIZE_PANEL,
    payload: {
      property,
      size
    }
  };
}
