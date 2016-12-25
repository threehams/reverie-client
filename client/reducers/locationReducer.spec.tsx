import { List } from 'immutable';

import { SetState } from '../actions/messageActions';
import { Location } from '../records';
import locationReducer, { INITIAL_STATE } from './locationReducer';

import { expect } from '../../__test__/configureExpect';

describe('locationReducer', () => {
  describe('SET_STATE', () => {
    it('saves location data', () => {
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

  // describe('default', () => {
  //   it('returns the state', () => {
  //     expect(locationReducer(undefined, { type: 'UNRELATED' })).to.equal(INITIAL_STATE);
  //   });
  // });
});
