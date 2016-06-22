import { List, Map, OrderedSet, Set } from 'immutable';

import * as inventoryActions from './inventoryActions';
import { Entity, Location, Ui } from '../records';
import expect from '../__test__/configureExpect';
import { EDITOR_SELECT_ITEMS } from './actionTypes';

describe('inventoryActions', function() {
  describe('expandItems', function() {
    context('selecting one item', function() {
      it('selects the item', function() {
        const thunk = inventoryActions.selectItem('4', '6');
        let result;
        const getState = () => {};
        const dispatch = (action) => {
          result = action;
        };
        thunk(dispatch, getState);
        expect(result.type).to.equal(EDITOR_SELECT_ITEMS);
        expect(result.payload.ids).to.equal(List(['4']));
        expect(result.payload.owner).to.equal('6');
      });
    });

    context('selecting multiple items', function() {
      context('when no items contain other items', function() {
        it('selects each of the items in order', function() {
          const state = Map({
            location: new Location(),
            ui: new Ui({
              player: '6',
              selectedItems: OrderedSet(['1'])
            }),
            entities: Map({
              '1': new Entity({
                id: '1'
              }),
              '2': new Entity({
                id: '2'
              }),
              '3': new Entity({
                id: '3'
              }),
              '4': new Entity({
                id: '4'
              }),
              '5': new Entity({
                id: '5'
              }),
              '6': new Entity({
                id: '6',
                entities: List(['1', '2', '4', '5'])
              })
            })
          });
          const thunk = inventoryActions.selectItem('4', 'self', { multiple: true });
          let result;
          const getState = () => state;
          const dispatch = (action) => {
            result = action;
          };
          thunk(dispatch, getState);
          expect(result.type).to.equal(EDITOR_SELECT_ITEMS);
          expect(result.payload.ids).to.equal(List(['1', '2', '4']));
          expect(result.payload.owner).to.equal('self');
        });
      });

      context('when an item contains other items', function() {
        it('selects each of the items in order', function() {
          const state = Map({
            location: new Location(),
            ui: new Ui({
              player: '6',
              selectedItems: OrderedSet(['1']),
              inventoryExpandedById: Set(['1', '2'])
            }),
            entities: Map({
              '1': new Entity({
                id: '1',
                entities: List(['2'])
              }),
              '2': new Entity({
                id: '2',
                entities: List(['3'])
              }),
              '3': new Entity({
                id: '3'
              }),
              '4': new Entity({
                id: '4'
              }),
              '6': new Entity({
                id: '6',
                entities: List(['1', '4'])
              })
            })
          });
          const thunk = inventoryActions.selectItem('4', 'self', { multiple: true });
          let result;
          const getState = () => state;
          const dispatch = (action) => {
            result = action;
          };
          thunk(dispatch, getState);
          expect(result.type).to.equal(EDITOR_SELECT_ITEMS);
          expect(result.payload.ids).to.equal(List(['1', '2', '3', '4']));
          expect(result.payload.owner).to.equal('self');
        });
      });

      context('when the first item occurs after the second item', function() {
        it('selects each of the items in order', function() {
          const state = Map({
            location: new Location(),
            ui: new Ui({
              player: '6',
              selectedItems: OrderedSet(['3']),
              inventoryExpandedById: Set(['1', '2'])
            }),
            entities: Map({
              '1': new Entity({
                id: '1',
                entities: List('2')
              }),
              '2': new Entity({
                id: '2',
                entities: List('3')
              }),
              '3': new Entity({
                id: '3'
              }),
              '4': new Entity({
                id: '4'
              }),
              '6': new Entity({
                id: '6',
                entities: List(['1', '4'])
              })
            })
          });
          const thunk = inventoryActions.selectItem('1', 'self', { multiple: true });
          let result;
          const getState = () => state;
          const dispatch = (action) => {
            result = action;
          };
          thunk(dispatch, getState);
          expect(result.type).to.equal(EDITOR_SELECT_ITEMS);
          expect(result.payload.ids).to.equal(List(['3', '2', '1']));
          expect(result.payload.owner).to.equal('self');
        });
      });

      context('large nested structure going backwards', function() {
        it('selects each of the items in reverse order', function() {
          const state = Map({
            location: new Location(),
            ui: new Ui({
              player: '6',
              selectedItems: OrderedSet(['4']),
              inventoryExpandedById: Set(['1', '2', '4'])
            }),
            entities: Map({
              '1': new Entity({
                id: '1',
                entities: List('2')
              }),
              '2': new Entity({
                id: '2',
                entities: List(['3', '4'])
              }),
              '3': new Entity({
                id: '3'
              }),
              '4': new Entity({
                id: '4',
                entities: List(['7'])
              }),
              '5': new Entity({
                id: '5'
              }),
              '6': new Entity({
                id: '6',
                name: 'player',
                entities: List(['1', '5'])
              }),
              '7': new Entity({
                id: '7'
              })
            })
          });
          const thunk = inventoryActions.selectItem('1', 'self', { multiple: true });
          let result;
          const getState = () => state;
          const dispatch = (action) => {
            result = action;
          };
          thunk(dispatch, getState);
          expect(result.type).to.equal(EDITOR_SELECT_ITEMS);
          expect(result.payload.ids).to.equal(List(['4', '3', '2', '1']));
          expect(result.payload.owner).to.equal('self');
        });
      });

    });
  });
});
