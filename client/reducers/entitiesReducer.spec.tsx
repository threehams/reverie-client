import { List, Map } from 'immutable';
import { expect } from '../../__test__/configureExpect';

import { Entity } from '../records';
import entitiesReducer, { INITIAL_STATE } from './entitiesReducer';

import { SetState } from '../actions/messageActions';

describe('entitiesReducer', () => {
  describe('SET_STATE', () => {
    it('merges entity records', () => {
      const initial = Map({
        1: new Entity({
          id: '1',
          name: 'thing1',
        }),
        2: new Entity({
          id: '2',
          name: 'thing2',
        }),
      });
      const action: SetState = {
        payload: {
          entities: Map({
            1: new Entity({
              id: '1',
              name: 'thing1',
            }),
            3: new Entity({
              id: '3',
              name: 'thing3',
            }),
          }),
          entitiesToRemove: List([]),
        },
        type: 'SET_STATE',
      };
      expect(entitiesReducer(initial, action)).to.equal(
        Map({
          1: new Entity({
            id: '1',
            name: 'thing1',
          }),
          2: new Entity({
            id: '2',
            name: 'thing2',
          }),
          3: new Entity({
            id: '3',
            name: 'thing3',
          }),
        }),
      );
    });

    it('removes records which are marked for deletion', () => {
      const initial = Map({
        1: new Entity({
          id: '1',
          name: 'thing1',
        }),
        2: new Entity({
          id: '2',
          name: 'thing2',
        }),
      });
      const action: SetState = {
        payload: {
          entities: Map<string, Entity>({}),
          entitiesToRemove: List(['1']),
        },
        type: 'SET_STATE',
      };
      expect(entitiesReducer(initial, action)).to.equal(
        Map({
          2: new Entity({
            id: '2',
            name: 'thing2',
          }),
        }),
      );
    });
  });

  // describe('default', () => {
  //   it('returns the state', () => {
  //     expect(entitiesReducer(undefined, { type: 'UNRELATED' })).to.equal(INITIAL_STATE);
  //   });
  // });
});
