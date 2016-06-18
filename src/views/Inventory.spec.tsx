import * as React from 'react';
import { List } from 'immutable';

import { expect } from '../__test__/configureExpect';
import { shallow } from 'enzyme';

import {Inventory} from './Inventory';
import InventoryItemContainer from './InventoryItem';

describe('Inventory', function() {
  describe('component', function() {
    it('creates a list of Inventory components', function() {
      // const tree = shallow(<Inventory items={List(['1', '2'])} />);
      // const items = tree.find(InventoryItemContainer);
      // expect(items.get(0).props.item).to.equal('1');
      // expect(items.get(1).props.item).to.equal('2');
    });
  });
});
