export function toggleExpand(id) {
  return {
    type: 'INVENTORY_TOGGLE_EXPAND',
    payload: {
      id: id
    }
  };
}
