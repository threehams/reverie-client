export function setActiveView(id) {
  return {
    type: 'EDITOR_SET_ACTIVE_VIEW',
    payload: {
      id: id
    }
  };
}

export function removeView(id) {
  return {
    type: 'EDITOR_REMOVE_VIEW',
    payload: {
      id: id
    }
  };
}
