import {Map, fromJS} from 'immutable';
import expect from '../__test__/configureExpect';

import entityByIdReducer from './entity-by-id-reducer';
import InventoryItemRecord from '../records/inventory-item-record';

describe('entityByIdReducer', function() {
  describe('ENTITY_FETCH_FULFILLED', function() {
    it('returns a map of records', function() {
      const initial = undefined;
      const action = {
        type: 'ENTITY_FETCH_FULFILLED',
        payload: fromJS({
          entityById: {'1': {}}
        })
      };
      expect(entityByIdReducer(initial, action)).to.equal(
        Map({ '1': new InventoryItemRecord()})
      );
    });
  });
});
