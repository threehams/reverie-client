import {fromJS} from 'immutable';
import chai, {expect} from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import uiReducer from './ui-reducer';
import {setState} from '../actions/initial-actions';
import {toggleExpand} from '../actions/inventory-actions';
import UiRecord from '../records/ui-record';

describe('uiReducer', function() {
  describe('SET_STATE', function() {
    it('returns the default UI state', function() {
      const initial = undefined;
      const action = setState(fromJS({}));
      expect(uiReducer(initial, action)).to.equal(new UiRecord());
    });
  });

  describe('INVENTORY_TOGGLE_EXPAND', function() {
    it('toggles the expanded state', function() {
      const initial = new UiRecord();
      const action = toggleExpand('1');
      expect(uiReducer(initial, action)).to.equal(new UiRecord(fromJS({
        inventoryExpandedById: {
          '1': true
        }
      })));
    });
  });
});
