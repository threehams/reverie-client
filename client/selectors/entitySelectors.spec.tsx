import { List, Map } from 'immutable';
import { Entity, State } from '../records';

import { expect } from '../../__test__/configureExpect';

import * as entitySelectors from './entitySelectors';

describe('entitySelectors', () => {
  describe('entitiesWithPath', () => {
    it('adds the correct owner and path to records', () => {
      const player = new Entity({
        entities: List(['2']),
        id: '1',
        name: 'Big McLargeHuge',
      });
      const state = new State({
        entities: Map({
          2: new Entity({
            entities: List(['3']),
            id: '2',
            name: 'container',
          }),
          3: new Entity({
            id: '3',
            name: 'item',
          }),
        }),
        player,
      });
      const entities = entitySelectors.entitiesWithPath(state);
      expect(entities).to.equal(Map({
        2: new Entity({
          entities: List(['3']),
          id: '2',
          name: 'container',
          owner: 'self',
          path: 'self/container',
        }),
        3: new Entity({
          id: '3',
          name: 'item',
          owner: 'self',
          path: 'self/container/item',
        }),
      }));
    });
  });
});
