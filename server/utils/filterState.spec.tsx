import { List, Map } from 'immutable';

import { expect } from '../../__test__/configureExpect';

import { Entity, State } from '../records';
import { filterEntities } from './filterState';

describe('filterState', () => {
  context('with player and location', () => {
    it('splits the location and player from the entity list', () => {
      const state = new State({
        entities: Map({
          1: new Entity({
            entities: List(['3']),
            id: '1',
            name: 'player',
          }),
          2: new Entity({
            entities: List(['1']),
            id: '2',
            name: 'location',
          }),
          3: new Entity({
            id: '3',
            name: 'thing',
          }),
        }),
      });
      const filtered = filterEntities('1', state.entities);
      expect(filtered.entities).to.equal(Map({
        3: new Entity({
          id: '3',
          name: 'thing',
        }),
      }));
      expect(filtered.location).to.equal(
        new Entity({
          entities: List([]),
          id: '2',
          name: 'location',
        }),
      );
      expect(filtered.player).to.equal(
        new Entity({
          entities: List(['3']),
          id: '1',
          name: 'player',
        }),
      );
    });
  });
});
