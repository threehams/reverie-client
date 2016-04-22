import { Map, List } from 'immutable';
import EntityRecord from '../records/EntityRecord';
import UiRecord from '../records/UiRecord';

import expect from '../__test__/configureExpect';

import * as entitySelectors from './entitySelectors';

describe('entitySelectors', function() {
  describe('entitiesWithPath', function() {
    it('adds the correct owner and path to records', function() {
      const player = new EntityRecord({
        id: '1',
        name: 'Big McLargeHuge',
        entities: List(['2'])
      });
      const state = Map({
        entities: Map({
          '1': player,
          '2': new EntityRecord({
            id: '2',
            name: 'container',
            entities: List(['3'])
          }),
          '3': new EntityRecord({
            id: '3',
            name: 'item'
          }),
        }),
        ui: new UiRecord({
          player: '1'
        })
      });
      const entities = entitySelectors.entitiesWithPath(state);
      expect(entities).to.equal(Map({
        '1': player,
        '2': new EntityRecord({
          id: '2',
          name: 'container',
          owner: 'self',
          path: 'self/container',
          entities: List(['3'])
        }),
        '3': new EntityRecord({
          id: '3',
          name: 'item',
          owner: 'self',
          path: 'self/container/item'
        }),
      }));
    });
  });
});
