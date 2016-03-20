import React from 'react';
import {List} from 'immutable';

import expect from '../__test__/configureExpect';
import sd from 'skin-deep';

import {Inventory} from './Inventory';

describe('Inventory', function() {
  describe('component', function() {
    it('creates a list of Inventory components', function() {
      const tree = sd.shallowRender(<Inventory ids={List(['1', '2'])} />);
      const items = tree.everySubTree('Connect(InventoryItem)');
      expect(items[0].props.id).to.equal('1');
      expect(items[1].props.id).to.equal('2');
    });
  });
});
