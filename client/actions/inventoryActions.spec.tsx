import { List, Map, OrderedSet, Set } from 'immutable';

import { expect } from '../../__test__/configureExpect';
import { Entity, Location, State, Ui } from '../records';
import * as inventoryActions from './inventoryActions';

describe('inventoryActions', function() {
  describe('expandItems', function() {
    context('selecting one item', function() {
      it('selects the item', function() {
        const thunk = inventoryActions.selectItem('4', '6');
        let result;
        const getState = () => {
          return new State();
        };
        const dispatch = (action) => {
          result = action;
        };
        thunk(dispatch, getState);
        expect(result.type).to.equal('INVENTORY_SELECT_ITEMS');
        expect(result.payload.ids).to.equal(List(['4']));
        expect(result.payload.owner).to.equal('6');
      });
    });

    context('selecting multiple items', function() {
      context('when no items contain other items', function() {
        it('selects each of the items in order', function() {
          const state = new State({
            entities: Map({
              '1': new Entity({
                id: '1',
                name: 'name',
              }),
              '2': new Entity({
                id: '2',
                name: 'name',
              }),
              '3': new Entity({
                id: '3',
                name: 'name',
              }),
              '4': new Entity({
                id: '4',
                name: 'name',
              }),
              '5': new Entity({
                id: '5',
                name: 'name',
              }),
              '6': new Entity({
                entities: List(['1', '2', '4', '5']),
                id: '6',
                name: 'name',
              }),
            }),
            location: new Location(),
            ui: new Ui({
              player: '6',
              selectedItems: OrderedSet(['1']),
            }),
          });
          const thunk = inventoryActions.selectItem('4', 'self', { multiple: true });
          let result;
          const getState = () => state;
          const dispatch = (action) => {
            result = action;
          };
          thunk(dispatch, getState);
          expect(result.type).to.equal('INVENTORY_SELECT_ITEMS');
          expect(result.payload.ids).to.equal(List(['1', '2', '4']));
          expect(result.payload.owner).to.equal('self');
        });
      });

      context('when an item contains other items', function() {
        it('selects each of the items in order', function() {
          const state = new State({
            entities: Map({
              '1': new Entity({
                entities: List(['2']),
                id: '1',
                name: 'name',
              }),
              '2': new Entity({
                entities: List(['3']),
                id: '2',
                name: 'name',
              }),
              '3': new Entity({
                id: '3',
                name: 'name',
              }),
              '4': new Entity({
                id: '4',
                name: 'name',
              }),
              '6': new Entity({
                entities: List(['1', '4']),
                id: '6',
                name: 'name',
              }),
            }),
            location: new Location(),
            ui: new Ui({
              inventoryExpandedById: Set(['1', '2']),
              player: '6',
              selectedItems: OrderedSet(['1']),
            }),
          });
          const thunk = inventoryActions.selectItem('4', 'self', { multiple: true });
          let result;
          const getState = () => state;
          const dispatch = (action) => {
            result = action;
          };
          thunk(dispatch, getState);
          expect(result.type).to.equal('INVENTORY_SELECT_ITEMS');
          expect(result.payload.ids).to.equal(List(['1', '2', '3', '4']));
          expect(result.payload.owner).to.equal('self');
        });
      });

      context('when the first item occurs after the second item', function() {
        it('selects each of the items in order', function() {
          const state = new State({
            entities: Map({
              '1': new Entity({
                entities: List(['2']),
                id: '1',
                name: 'name',
              }),
              '2': new Entity({
                entities: List(['3']),
                id: '2',
                name: 'name',
              }),
              '3': new Entity({
                id: '3',
                name: 'name',
              }),
              '4': new Entity({
                id: '4',
                name: 'name',
              }),
              '6': new Entity({
                entities: List(['1', '4']),
                id: '6',
                name: 'name',
              }),
            }),
            location: new Location(),
            ui: new Ui({
              inventoryExpandedById: Set(['1', '2']),
              player: '6',
              selectedItems: OrderedSet(['3']),
            }),
          });
          const thunk = inventoryActions.selectItem('1', 'self', { multiple: true });
          let result;
          const getState = () => state;
          const dispatch = (action) => {
            result = action;
          };
          thunk(dispatch, getState);
          expect(result.type).to.equal('INVENTORY_SELECT_ITEMS');
          expect(result.payload.ids).to.equal(List(['3', '2', '1']));
          expect(result.payload.owner).to.equal('self');
        });
      });

      context('large nested structure going backwards', function() {
        it('selects each of the items in reverse order', function() {
          const state = new State({
            entities: Map({
              '1': new Entity({
                entities: List(['2']),
                id: '1',
                name: 'name',
              }),
              '2': new Entity({
                entities: List(['3', '4']),
                id: '2',
                name: 'name',
              }),
              '3': new Entity({
                id: '3',
                name: 'name',
              }),
              '4': new Entity({
                entities: List(['7']),
                id: '4',
                name: 'name',
              }),
              '5': new Entity({
                id: '5',
                name: 'name',
              }),
              '6': new Entity({
                entities: List(['1', '5']),
                id: '6',
                name: 'player',
              }),
              '7': new Entity({
                id: '7',
                name: 'name',
              }),
            }),
            location: new Location(),
            ui: new Ui({
              inventoryExpandedById: Set(['1', '2', '4']),
              player: '6',
              selectedItems: OrderedSet(['4']),
            }),
          });
          const thunk = inventoryActions.selectItem('1', 'self', { multiple: true });
          let result;
          const getState = () => state;
          const dispatch = (action) => {
            result = action;
          };
          thunk(dispatch, getState);
          expect(result.type).to.equal('INVENTORY_SELECT_ITEMS');
          expect(result.payload.ids).to.equal(List(['4', '3', '2', '1']));
          expect(result.payload.owner).to.equal('self');
        });
      });
    });
  });
});
