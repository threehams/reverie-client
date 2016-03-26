import {List, OrderedSet, fromJS} from 'immutable';
import expect from '../__test__/configureExpect';

import uiReducer from './ui-reducer';
import * as initialActions from '../actions/initial-actions';
import * as inventoryActions from '../actions/inventory-actions';
import * as editorActions from '../actions/editor-actions';
import UiRecord from '../records/ui-record';

describe('uiReducer', function() {
  describe('SET_STATE', function() {
    it('returns the default UI state', function() {
      const initial = undefined;
      const action = initialActions.setState({
        player: '1'
      });
      expect(uiReducer(initial, action)).to.equal(new UiRecord({player: '1'}));
    });
  });

  describe('INVENTORY_TOGGLE_EXPAND', function() {
    it('toggles the expanded state', function() {
      const initial = new UiRecord();
      const action = inventoryActions.toggleExpand('1');
      expect(uiReducer(initial, action)).to.equal(new UiRecord(fromJS({
        inventoryExpandedById: {
          '1': true
        }
      })));
    });
  });

  describe('EDITOR_REMOVE_VIEW', function() {
    context('when removing the current view', function() {
      it('sets the active view to the next available view', function() {
        const initial = new UiRecord({
          editorViews: OrderedSet(['1', '2', '3', '4']),
          activeEditorView: '2'
        });
        const action = editorActions.removeView('2');
        const newState = uiReducer(initial, action);
        expect(newState.editorViews).to.equal(OrderedSet(['1', '3', '4']));
        expect(newState.activeEditorView).to.equal('4');
      });
    });

    context('when removing a non-current view', function() {
      it('does not change the active view', function() {
        const initial = new UiRecord({
          editorViews: OrderedSet(['1', '2']),
          activeEditorView: '2'
        });
        const action = editorActions.removeView('1');
        const newState = uiReducer(initial, action);
        expect(newState.editorViews).to.equal(OrderedSet('2'));
        expect(newState.activeEditorView).to.equal('2');
      });
    });
  });

  describe('EDITOR_SELECT_ITEMS', function() {
    it('sets the items to the list given', function() {
      const initial = new UiRecord({});
      const action = {
        type: 'EDITOR_SELECT_ITEMS',
        payload: {
          ids: List(['2', '3', '4'])
        }
      };
      const newState = uiReducer(initial, action);
      expect(newState.selectedItems).to.equal(OrderedSet(['2', '3', '4']));
    });
  });
});
