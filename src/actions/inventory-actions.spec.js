import {List, Map, OrderedSet} from 'immutable';

import * as inventoryActions from './inventory-actions';
import UiRecord from '../records/ui-record';
import EntityRecord from '../records/entity-record';
import expect from '../__test__/configureExpect';
import { EDITOR_SELECT_ITEMS } from './action-types';

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
        expect(result.payload.containerId).to.equal('6');
      });
    });

    context('selecting multiple items', function() {
      context('when no items contain other items', function() {
        it('selects each of the items in order', function() {
          const state = Map({
            ui: new UiRecord({
              selectedItems: OrderedSet(['1'])
            }),
            entities: Map({
              '1': new EntityRecord({
                id: '1'
              }),
              '2': new EntityRecord({
                id: '2'
              }),
              '3': new EntityRecord({
                id: '3'
              }),
              '4': new EntityRecord({
                id: '4'
              }),
              '5': new EntityRecord({
                id: '5'
              }),
              '6': new EntityRecord({
                id: '6',
                entities: List(['1', '2', '4', '5'])
              })
            })
          });
          const thunk = inventoryActions.selectItem('4', '6', {multiple: true});
          let result;
          const getState = () => state;
          const dispatch = (action) => {
            result = action;
          };
          thunk(dispatch, getState);
          expect(result.type).to.equal(EDITOR_SELECT_ITEMS);
          expect(result.payload.ids).to.equal(List(['1', '2', '4']));
          expect(result.payload.containerId).to.equal('6');
        });
      });

      context('when an item contains other items', function() {
        it('selects each of the items in order', function() {
          const state = Map({
            ui: new UiRecord({
              selectedItems: OrderedSet(['1'])
            }),
            entities: Map({
              '1': new EntityRecord({
                id: '1',
                entities: List('2')
              }),
              '2': new EntityRecord({
                id: '2',
                entities: List('3')
              }),
              '3': new EntityRecord({
                id: '3'
              }),
              '4': new EntityRecord({
                id: '4'
              }),
              '6': new EntityRecord({
                id: '6',
                entities: List(['1', '4'])
              })
            })
          });
          const thunk = inventoryActions.selectItem('4', '6', {multiple: true});
          let result;
          const getState = () => state;
          const dispatch = (action) => {
            result = action;
          };
          thunk(dispatch, getState);
          expect(result.type).to.equal(EDITOR_SELECT_ITEMS);
          expect(result.payload.ids).to.equal(List(['1', '2', '3', '4']));
          expect(result.payload.containerId).to.equal('6');
        });
      });

      context('when the first item occurs after the second item', function() {
        it('selects each of the items in order', function() {
          const state = Map({
            ui: new UiRecord({
              selectedItems: OrderedSet(['3'])
            }),
            entities: Map({
              '1': new EntityRecord({
                id: '1',
                entities: List('2')
              }),
              '2': new EntityRecord({
                id: '2',
                entities: List('3')
              }),
              '3': new EntityRecord({
                id: '3'
              }),
              '4': new EntityRecord({
                id: '4'
              }),
              '6': new EntityRecord({
                id: '6',
                entities: List(['1', '4'])
              })
            })
          });
          const thunk = inventoryActions.selectItem('1', '6', {multiple: true});
          let result;
          const getState = () => state;
          const dispatch = (action) => {
            result = action;
          };
          thunk(dispatch, getState);
          expect(result.type).to.equal(EDITOR_SELECT_ITEMS);
          expect(result.payload.ids).to.equal(List(['1', '2', '3']));
          expect(result.payload.containerId).to.equal('6');
        });
      });

      context('large nested structure going backwards', function() {
        it('selects each of the items in order', function() {
          const state = Map({
            ui: new UiRecord({
              selectedItems: OrderedSet(['4'])
            }),
            entities: Map({
              '1': new EntityRecord({
                id: '1',
                entities: List('2')
              }),
              '2': new EntityRecord({
                id: '2',
                entities: List(['3', '4'])
              }),
              '3': new EntityRecord({
                id: '3'
              }),
              '4': new EntityRecord({
                id: '4',
                entities: ['7']
              }),
              '5': new EntityRecord({
                id: '5'
              }),
              '6': new EntityRecord({
                id: '6',
                name: 'player',
                entities: List(['1', '5'])
              }),
              '7': new EntityRecord({
                id: '7'
              })
            })
          });
          const thunk = inventoryActions.selectItem('1', '6', {multiple: true});
          let result;
          const getState = () => state;
          const dispatch = (action) => {
            result = action;
          };
          thunk(dispatch, getState);
          expect(result.type).to.equal(EDITOR_SELECT_ITEMS);
          expect(result.payload.ids).to.equal(List(['1', '2', '3', '4']));
          expect(result.payload.containerId).to.equal('6');
        });
      });

    });
  });
});
