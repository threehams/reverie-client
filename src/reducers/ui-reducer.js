import {Map, fromJS} from 'immutable';

export default function uiReducer(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return state.merge(
        fromJS({ inventoryExpandedById: {} })
      );
    case 'INVENTORY_TOGGLE_EXPAND':
      return state.updateIn(['inventoryExpandedById', action.payload.id], expanded => !expanded);
    default:
      return state;
  }
}
