import { List } from 'immutable';

import { SetState } from '../actions/messageActions';
import { Location } from '../records';
import locationReducer, { INITIAL_STATE } from './locationReducer';

import { expect } from '../../__test__/configureExpect';

describe('locationReducer', function() {
  describe('SET_STATE', function() {
    it('saves location data', function() {
      const initial = undefined;
      const location = new Location({
        exits: List(['north', 'south']),
      });
      const action: SetState = {
        payload: {
          location,
        },
        type: 'SET_STATE',
      };
      expect(locationReducer(initial, action)).to.equal(location);
    });
  });

  // describe('default', function() {
  //   it('returns the state', function() {
  //     expect(locationReducer(undefined, { type: 'UNRELATED' })).to.equal(INITIAL_STATE);
  //   });
  // });
});
