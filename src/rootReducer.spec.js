import rootReducer from './rootReducer';
import {Map, fromJS} from 'immutable';
import chai, {expect} from 'chai';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable);

describe('rootReducer', function() {
  describe('SET_STATE', function() {
    it('returns the state', function() {
      const initial = fromJS({});
      const action = {
        type: 'SET_STATE',
        payload: fromJS({
          inventoryById: {},
          inventoryIds: []
        })
      };
      expect(rootReducer(initial, action)).to.equal(fromJS({
        inventoryById: {},
        inventoryIds: []
      }));
    });
  });
});
