import {List} from 'immutable';

export default function inventoryIdsReducer(state = List(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload.get('inventoryIds');
    default:
      return state;
  }
}
