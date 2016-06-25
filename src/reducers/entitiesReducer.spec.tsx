import { Map, List } from 'immutable';
import { expect } from '../__test__/configureExpect';

import entitiesReducer, { INITIAL_STATE } from './entitiesReducer';
import { Entity } from '../records';
import { SET_STATE } from '../actions/actionTypes';

describe('entitiesReducer', function() {
  describe('SET_STATE', function() {
    it('merges entity records', function() {
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
          entities: Map({
            '1': new Entity({
              id: '1',
              name: 'thing1',
            }),
            '3': new Entity({
              id: '3',
              name: 'thing3',
            }),
          }),
          entitiesToRemove: List(),
        },
        type: SET_STATE,
      };
      expect(entitiesReducer(initial, action)).to.equal(
        Map({
          '1': new Entity({
            id: '1',
            name: 'thing1',
          }),
          '2': new Entity({
            id: '2',
            name: 'thing2',
          }),
          '3': new Entity({
            id: '3',
            name: 'thing3',
          }),
        })
      );
    });

    it('removes records which are marked for deletion', function() {
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
        Map({
          '2': new Entity({
            id: '2',
            name: 'thing2',
          }),
        })
      );
    });
  });

  describe('default', function() {
    it('returns the state', function() {
      expect(entitiesReducer(undefined, { type: 'UNRELATED' })).to.equal(INITIAL_STATE);
    });
  });
});
