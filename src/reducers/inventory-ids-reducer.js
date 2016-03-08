import {List} from 'immutable';

export default function inventoryIdsReducer(state = List(), action) {
  switch (action.type) {
    case 'ENTITY_FETCH_FULFILLED':
      return action.payload.get('inventoryIds');
    default:
      return state;
  }
}
