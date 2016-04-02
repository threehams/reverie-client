import React from 'react';
import {List} from 'immutable';

import expect from '../__test__/configureExpect';
import { shallow } from 'enzyme';

import {Inventory} from './Inventory';

describe('Inventory', function() {
  describe('component', function() {
    it('creates a list of Inventory components', function() {
      const tree = shallow(<Inventory ids={List(['1', '2'])} />);
      const items = tree.find('Connect(InventoryItem)');
      expect(items.get(0).props.id).to.equal('1');
      expect(items.get(1).props.id).to.equal('2');
    });
  });
});
