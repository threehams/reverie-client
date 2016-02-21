import {fromJS} from 'immutable';
import chai, {expect} from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

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
