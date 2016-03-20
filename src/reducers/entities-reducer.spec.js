import {Map, fromJS} from 'immutable';
import expect from '../__test__/configureExpect';

import entitiesReducer from './entities-reducer';
import EntityRecord from '../records/entity-record';
import { SET_STATE } from '../actions/action-types';

describe('entitiesReducer', function() {
  describe('ENTITY_FETCH_FULFILLED', function() {
    it('returns a map of records', function() {
      const initial = undefined;
      const action = {
        type: SET_STATE,
        payload: {
          entities: fromJS({'1': {}})
        }
      };
      expect(entitiesReducer(initial, action)).to.equal(
        Map({ '1': new EntityRecord()})
      );
    });
  });
});
