import {fromJS} from 'immutable';
import expect from '../__test__/configureExpect';

import inventoryIdsReducer from './inventory-ids-reducer';

describe('inventoryIdsReducer', function() {
  describe('SET_STATE', function() {
    it('returns the inventory ids', function() {
      const initial = undefined;
      const action = {
        type: 'INVENTORY_FETCH_FULFILLED',
        payload: fromJS({
          inventoryIds: ['1']
        })
      };
      expect(inventoryIdsReducer(initial, action)).to.equal(fromJS(['1']));
    });
  });
});
