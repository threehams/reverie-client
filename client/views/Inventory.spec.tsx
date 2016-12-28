import { List } from 'immutable';
import * as React from 'react';

import { shallow } from 'enzyme';
import { expect } from '../../__test__/configureExpect';

import { Entity } from '../records';
import { InventoryBase } from './Inventory';
import { InventoryItem } from './InventoryItem';

describe('Inventory', () => {
  describe('component', () => {
    it('creates a list of Inventory components', () => {
      const props = {
        addView: () => { /* stub */ },
        moveItem: () => { /* stub */ },
        selectItem: () => { /* stub */ },
        toggleExpand: () => { /* stub */ },
        toggleItem: () => { /* stub */ },
      };
      const entities = List([
        new Entity({ id: '1', name: '1' }),
        new Entity({ id: '2', name: '2' }),
      ]);
      const tree = shallow(<InventoryBase {...props} items={entities} />);
      const items = tree.find(InventoryItem);
      expect(items.get(0).props.item).to.equal(entities.get(0));
      expect(items.get(1).props.item).to.equal(entities.get(1));
    });
  });
});
