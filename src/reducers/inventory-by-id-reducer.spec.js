import {Map, fromJS} from 'immutable';
import expect from '../__test__/configureExpect';

import inventoryByIdReducer from './inventory-by-id-reducer';
import {setState} from '../actions/initial-actions';
import InventoryItemRecord from '../records/inventory-item-record';

describe('inventoryByIdReducer', function() {
  describe('SET_STATE', function() {
    it('returns a map of records', function() {
      const initial = undefined;
      const action = setState(fromJS({
        inventoryById: { '1': {} }
      }));
      expect(inventoryByIdReducer(initial, action)).to.equal(
        Map({ '1': new InventoryItemRecord()})
      );
    });
  });
});
