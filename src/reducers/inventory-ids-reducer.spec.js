import {fromJS} from 'immutable';
import expect from '../__test__/configureExpect';

import inventoryIdsReducer from './inventory-ids-reducer';
import {setState} from '../actions/initial-actions';

describe('inventoryIdsReducer', function() {
  describe('SET_STATE', function() {
    it('returns the inventory ids', function() {
      const initial = undefined;
      const action = setState(fromJS({
        inventoryIds: ['1']
      }));
      expect(inventoryIdsReducer(initial, action)).to.equal(fromJS(['1']));
    });
  });
});
