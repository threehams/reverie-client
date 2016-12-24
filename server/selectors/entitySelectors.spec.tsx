import { Map } from 'immutable';
import { Entity, State } from '../records';

import { expect } from '../../__test__/configureExpect';

import * as entitySelectors from './entitySelectors';

describe('entitySelectors', function() {
  let entity1: Entity;
  let entity2: Entity;
  let entity3: Entity;

  describe('diff', function() {
    beforeEach(function() {
      entity1 = new Entity({
        id: '1',
        name: 'thing1',
      });
      entity2 = new Entity({
        id: '2',
        name: 'thing2',
      });
      entity3 = new Entity({
        id: '3',
        name: 'thing3',
      });
    });

    it('returns entities with changes', function() {
      const prev = new State({
        entities: Map({
          '1': entity1,
          '2': entity2,
          '3': entity3,
        }),
      });
      const state = new State({
        entities: Map({
          '1': entity1,
          '2': entity2.set('name', 'newthing'),
          '3': entity3,
        }),
      });
      const diff = entitySelectors.diff(state, prev);
      expect(diff).to.equal(Map({
        '2': new Entity({
          id: '2',
          name: 'newthing',
        }),
      }));
    });

    it('returns nulled entities', function() {
      const prev = new State({
        entities: Map({
          '1': entity1,
          '2': entity2,
        }),
      });
      const state = new State({
        entities: Map({
          '1': entity1,
          '2': null,
        }),
      });
      const diff = entitySelectors.diff(state, prev);
      expect(diff).to.equal(Map({
        '2': null,
      }));
    });
  });
});
