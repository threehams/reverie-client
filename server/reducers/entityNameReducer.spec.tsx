import { List, Map, Set } from 'immutable';
import { expect } from '../../__test__/configureExpect';

import { Entity } from '../records';
import { entityNameReducer } from './entityNameReducer';

import { SetState } from '../actions/messageActions';

describe('entityNameReducer', () => {
  describe('SET_STATE', () => {
    context('with no nesting', () => {
      it('builds a empty map', () => {
        const action: SetState = {
          payload: {
            entities: Map({
              1: new Entity({
                components: Set(['creature']),
                id: '1',
                name: 'player',
              }),
              2: new Entity({
                components: Set(['location']),
                id: '2',
                name: 'location',
              }),
              3: new Entity({
                id: '3',
                name: 'thing',
              }),
            }),
          },
          type: 'SET_STATE',
        };
        expect(entityNameReducer(undefined, action)).to.equal(
          Map({}),
        );
      });
    });

    context('with nesting', () => {
      it('builds a name-lookup map for nested entities', () => {
        const action: SetState = {
          payload: {
            entities: Map({
              1: new Entity({
                components: Set(['creature']),
                entities: List(['2', '3']),
                id: '1',
                name: 'player',
              }),
              2: new Entity({
                id: '2',
                name: 'thing',
              }),
              3: new Entity({
                entities: List(['4']),
                id: '3',
                name: 'container',
              }),
              4: new Entity({
                id: '4',
                name: 'arrow',
              }),
            }),
          },
          type: 'SET_STATE',
        };
        const result = entityNameReducer(undefined, action);
        expect(result).to.equal(
          Map({
            1: Map({
              container: Map({
                arrow: Map({
                  id: '4',
                }),
                id: '3',
              }),
              id: '1',
              thing: Map({
                id: '2',
              }),
            }),
          }),
        );

        // usage - take split path and use getIn
        expect(result.getIn(['1', 'container', 'arrow', 'id'])).to.equal('4');
        expect(result.getIn(['1', 'container', 'id'])).to.equal('3');
      });
    });
  });
});
