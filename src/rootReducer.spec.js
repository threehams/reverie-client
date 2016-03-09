import {fromJS} from 'immutable';
import expect from './__test__/configureExpect';

import rootReducer from './rootReducer';
import UiRecord from './records/ui-record';


describe('rootReducer', function() {
  describe('DEFAULT', function() {
    it('returns the state', function() {
      const initial = fromJS({});
      const action = {
        type: 'DEFAULT',
        payload: {}
      };
      expect(rootReducer(initial, action)).to.equal(fromJS({
        commandHistory: [],
        entityById: {},
        ui: new UiRecord()
      }));
    });
  });
});
