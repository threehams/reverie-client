import * as React from 'react';
import { List } from 'immutable';

import { expect } from '../__test__/configureExpect';
import { shallow } from 'enzyme';

import { Inventory } from './Inventory';
import InventoryItemContainer from './InventoryItem';
import { Entity } from '../records';

describe('Inventory', function() {
  describe('component', function() {
    let props;

    beforeEach(function() {
      props = {
        addView: () => { /* stub */ },
        // addView: () => {},
        // addView: () => {},
        // addView: () => {},
        // addView: () => {},
      };
    });

    it('creates a list of Inventory components', function() {
      const entities = List([
        new Entity({ id: '1', name: '1' }),
        new Entity({ id: '2', name: '2' }),
      ]);
      const tree = shallow(<Inventory {...props} items={entities} />);
      const items = tree.find(InventoryItemContainer);
      expect(items.get(0).props.item).to.equal(entities.get(0));
      expect(items.get(1).props.item).to.equal(entities.get(1));
    });
  });
});
