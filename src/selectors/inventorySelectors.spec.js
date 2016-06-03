import { Map, List, Set } from 'immutable';
import EntityRecord from '../records/EntityRecord';
import LocationRecord from '../records/LocationRecord';
import UiRecord from '../records/UiRecord';

import expect from '../__test__/configureExpect';

import * as inventorySelectors from './inventorySelectors';

describe('inventorySelectors', function() {
  describe('list', function() {
    context('when an item is expanded', function() {
      it('returns the list with the correct expansion and indent', function() {
        const player = new EntityRecord({
          id: '1',
          name: 'Big McLargeHuge',
          entities: List(['2'])
        });
        const state = Map({
          location: new LocationRecord(),
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
            '4': new EntityRecord({
              id: '4',
              name: 'item'
            }),
          }),
          ui: new UiRecord({
            player: '1',
            inventoryExpandedById: Set('2')
          })
        });
        const entities = inventorySelectors.list(state);
        expect(entities.toJS()).to.eql(Map({
          self: List([
            new EntityRecord({
              id: '2',
              expanded: true,
              name: 'container',
              owner: 'self',
              path: 'self/container',
              entities: List(['3']),
              indent: 1
            }),
            new EntityRecord({
              id: '3',
              name: 'item',
              owner: 'self',
              path: 'self/container/item',
              indent: 2
            })
          ]),
          floor: List([])
        }).toJS());
      });
    });

    context('when an item is not expanded', function() {
      it('filters out the item\'s entities', function() {
        const player = new EntityRecord({
          id: '1',
          name: 'Big McLargeHuge',
          entities: List(['2'])
        });
        const state = Map({
          location: new LocationRecord(),
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
            '4': new EntityRecord({
              id: '4',
              name: 'item'
            }),
          }),
          ui: new UiRecord({
            player: '1'
          })
        });
        const props = { owner: 'self' };
        const entities = inventorySelectors.list(state, props);
        expect(entities.toJS()).to.eql(Map({
          self: List([
            new EntityRecord({
              id: '2',
              name: 'container',
              owner: 'self',
              path: 'self/container',
              entities: List(['3']),
              indent: 1
            })
          ]),
          floor: List([])
        }).toJS());
      });
    });
  });
});
