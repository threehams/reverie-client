import { List } from 'immutable';

import { SetState } from '../actions/messageActions';
import { Entity } from '../records';
import { locationReducer } from './locationReducer';

import { expect } from '../../__test__/configureExpect';

describe('locationReducer', () => {
  describe('SET_STATE', () => {
    it('saves location data', () => {
      const location = new Entity({
        exits: List(['north', 'south']),
        id: '1',
        name: 'location',
      });
      const action: SetState = {
        payload: {
          location,
        },
        type: 'SET_STATE',
      };
      expect(locationReducer(undefined, action)).to.equal(location);
    });
  });
});
