import React from 'react';
import {createStore} from 'redux';
import {Map, List} from 'immutable';

import expect from '../__test__/configureExpect';
import sd from 'skin-deep';

import InventoryContainer, {Inventory} from './Inventory';

describe('Inventory', function() {
  let store;

  const configureStore = (inventory) => {
    return createStore(() => {
      return Map({
        inventoryIds: inventory
      });
    });
  };

  describe('connected component', function() {
    beforeEach(function() {
      store = configureStore(List(['1', '2']));
    });

    it('passes IDs to Inventory', function() {
      const tree = sd.shallowRender(<InventoryContainer />, {store});
      expect(tree.props.ids).to.equal(List(['1', '2']));
    });
  });

  describe('component', function() {
    it('creates a list of Inventory components', function() {
      const tree = sd.shallowRender(<Inventory ids={List(['1', '2'])} />);
      const items = tree.everySubTree('Connect(InventoryItem)');
      expect(items[0].props.id).to.equal('1');
      expect(items[1].props.id).to.equal('2');
    });
  });
});
