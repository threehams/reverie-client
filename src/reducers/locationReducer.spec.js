import { List } from 'immutable';

import { SET_STATE } from '../actions/actionTypes';
import locationReducer, { INITIAL_STATE } from './locationReducer';
import LocationRecord from '../records/LocationRecord';

import expect from '../__test__/configureExpect';

describe('locationReducer', function() {
  describe('SET_STATE', function() {
    it('saves location data', function() {
      const initial = undefined;
      const location = new LocationRecord({
        exits: List(['north', 'south'])
      });
      const action = {
        type: SET_STATE,
        payload: {
          location
        }
      };
      expect(locationReducer(initial, action)).to.equal(location);
    });
  });

  describe('default', function() {
    it('returns the state', function() {
      expect(locationReducer(undefined, {})).to.equal(INITIAL_STATE);
    });
  });
});
