import {fromJS} from 'immutable';
import chai, {expect} from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

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
