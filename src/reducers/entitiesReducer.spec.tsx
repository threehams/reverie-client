import { Map, fromJS, List } from 'immutable';
import { expect } from '../__test__/configureExpect';

import entitiesReducer, { INITIAL_STATE } from './entitiesReducer';
import { Entity } from '../records';
import { SET_STATE } from '../actions/actionTypes';

describe('entitiesReducer', function() {
  describe('SET_STATE', function() {
    xit('returns a map of records', function() {
      const initial = undefined;
      const action = {
        payload: {
          entities: fromJS({'1': {}}),
          entitiesToRemove: List(),
        },
        type: SET_STATE,
      };
      expect(entitiesReducer(initial, action)).to.equal(
        Map({ '1': new Entity()})
      );
    });

    xit('removes records which are marked for deletion', function() {
      const initial = Map({
        '1': new Entity({
          id: '1',
          name: 'thing1',
        }),
        '2': new Entity({
          id: '2',
          name: 'thing2',
        }),
      });
      const action = {
        payload: {
          entities: Map(),
          entitiesToRemove: List(['1']),
        },
        type: SET_STATE,
      };
      expect(entitiesReducer(initial, action)).to.equal(
        Map({ '2': new Entity({
          id: '2',
          name: 'a thing',
        })})
      );
    });
  });

  describe('default', function() {
    it('returns the state', function() {
      expect(entitiesReducer(undefined, {})).to.equal(INITIAL_STATE);
    });
  });
});
