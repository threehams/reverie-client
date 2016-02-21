import {List} from 'immutable';

export default function inventoryIdsReducer(state = List(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload.inventoryIds;
    default:
      return state;
  }
}
