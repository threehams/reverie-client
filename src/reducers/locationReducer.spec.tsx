import { List } from 'immutable';

import { SET_STATE } from '../actions/actionTypes';
import locationReducer, { INITIAL_STATE } from './locationReducer';
import { Location } from '../records';

import { expect } from '../__test__/configureExpect';

describe('locationReducer', function() {
  describe('SET_STATE', function() {
    it('saves location data', function() {
      const initial = undefined;
      const location = new Location({
        exits: List(['north', 'south']),
      });
      const action = {
        payload: {
          location,
        },
        type: SET_STATE,
      };
      expect(locationReducer(initial, action)).to.equal(location);
    });
  });

  describe('default', function() {
    it('returns the state', function() {
      expect(locationReducer(undefined, { type: 'UNRELATED' })).to.equal(INITIAL_STATE);
    });
  });
});
