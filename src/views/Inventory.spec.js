import React from 'react';

import expect from '../__test__/configureExpect';
import { shallow } from 'enzyme';

import {Inventory} from './Inventory';
import InventoryItemContainer from './InventoryItem';

describe('Inventory', function() {
  describe('component', function() {
    it('creates a list of Inventory components', function() {
      const tree = shallow(<Inventory id={'1'} />);
      const item = tree.find(InventoryItemContainer);
      expect(item.props().id).to.equal('1');
    });
  });
});
