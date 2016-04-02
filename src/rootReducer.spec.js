import {fromJS} from 'immutable';
import expect from './__test__/configureExpect';

import rootReducer from './rootReducer';
import UiRecord from './records/uiRecord';


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
        editorHistory: [],
        entities: {},
        ui: new UiRecord()
      }));
    });
  });
});
