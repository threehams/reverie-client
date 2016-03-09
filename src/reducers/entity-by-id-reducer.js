import {Map} from 'immutable';
import EntityRecord from '../records/entity-record';

export default function entityByIdReducer(state = Map(), action) {
  switch (action.type) {
    case 'ENTITY_FETCH_FULFILLED':
      return action.payload.entityById.map(inventoryItem => {
        return new EntityRecord(inventoryItem);
      });
    default:
      return state;
  }
}
