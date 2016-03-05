import React from 'react';
import {createStore} from 'redux';
import {Map, fromJS, List} from 'immutable';

import expect from '../__test__/configureExpect';
import sd from 'skin-deep';

import AutocompleteContainer, {Autocomplete} from './Autocomplete';
import InventoryItemRecord from '../records/inventory-item-record';

describe('Autocomplete', function() {
  let store;

  const configureStore = (inventory) => {
    return createStore(() => {
      return Map({
        inventoryById: inventory
      });
    });
  };

  describe('connected component', function() {
    context('scripts', function() {
      beforeEach(function() {
        const inventory = fromJS({
          '1': new InventoryItemRecord({
            id: '1',
            name: 'rm',
            type: 'script'
          }),
          '2': new InventoryItemRecord({
            id: '2',
            name: 'rm-hack',
            type: 'script'
          })
        });
        store = configureStore(inventory);
      });

      it('matches all scripts', function() {
        const tree = sd.shallowRender( <AutocompleteContainer command="rm" />, {store });
        const element = tree.getRenderOutput();
        expect(element.props.options).to.equal(List(['rm', 'rm-hack']));
      });
    });

    context('other items', function() {
      beforeEach(function() {
        const inventory = fromJS({
          '1': new InventoryItemRecord({
            id: '1',
            name: 'rm',
            type: 'file'
          })
        });
        store = configureStore(inventory);
      });

      it('does not match files', function() {
        const tree = sd.shallowRender(<AutocompleteContainer command="rm" />, {store });
        expect(tree.props.options).to.equal(List([]));
      });
    });
  });
});
