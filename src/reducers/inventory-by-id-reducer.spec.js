import {fromJS} from 'immutable';
import expect from '../__test__/configureExpect';

import inventoryByIdReducer from './inventory-by-id-reducer';
import {setState} from '../actions/initial-actions';

describe('inventoryByIdReducer', function() {
  describe('SET_STATE', function() {
    it('returns the state', function() {
      const initial = undefined;
      const action = setState(fromJS({
        inventoryById: {}
      }));
      expect(inventoryByIdReducer(initial, action)).to.equal(fromJS({}));
    });
  });
});
