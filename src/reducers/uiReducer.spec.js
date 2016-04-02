import {Map, List, OrderedSet, fromJS} from 'immutable';
import expect from '../__test__/configureExpect';

import uiReducer from './uiReducer';
import * as initialActions from '../actions/initialActions';
import * as inventoryActions from '../actions/inventoryActions';
import * as editorActions from '../actions/editorActions';
import { COMMAND_SEND } from '../actions/actionTypes';
import * as commandActions from '../actions/commandActions';
import UiRecord from '../records/uiRecord';

describe('uiReducer', function() {
  describe('COMMAND_SEND', function() {
    it('clears the current command', function() {
      const initial = new UiRecord({
        currentCommand: 'get inventory'
      });
      const action = {
        type: COMMAND_SEND,
        payload: {
          command: 'do something else'
        }
      };
      expect(uiReducer(initial, action).currentCommand).to.equal('');
    });
  });

  describe('COMMAND_SET_CURRENT', function() {
    it('sets the current command', function() {
      const initial = new UiRecord({
        currentCommand: 'get inv'
      });
      const action = commandActions.setCurrentCommand('get inve');
      expect(uiReducer(initial, action).currentCommand).to.equal('get inve');
    });
  });

  describe('EDITOR_ADD_VIEW', function() {
    it('adds a new view and sets it as active', function() {
      const initial = new UiRecord({
        editorViews: OrderedSet(['3'])
      });
      const action = editorActions.addView('1');
      const newState = uiReducer(initial, action);
      expect(newState.editorViews).to.equal(OrderedSet(['3', '1']));
      expect(newState.activeEditorView).to.equal('1');
    });
  });

  describe('EDITOR_SET_ACTIVE_VIEW', function() {
    it('sets the view as active', function() {
      const initial = new UiRecord({
        activeEditorView: '1'
      });
      const action = editorActions.setActiveView('3');
      expect(uiReducer(initial, action).activeEditorView).to.equal('3');
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

  describe('INVENTORY_TOGGLE_SELECT', function() {
    describe('when item is selected', function() {
      it('removes the item', function() {
        const initial = new UiRecord({
          selectedItems: OrderedSet(['1'])
        });
        const action = inventoryActions.toggleItem('1');
        expect(uiReducer(initial, action).selectedItems).not.to.contain('1');
      });
    });

    describe('when item is not selected', function() {
      it('adds the item', function() {
        const initial = new UiRecord();
        const action = inventoryActions.toggleItem('1');
        expect(uiReducer(initial, action).selectedItems).to.contain('1');
      });
    });
  });

  describe('SET_STATE', function() {
    it('returns the default UI state', function() {
      const initial = undefined;
      const action = initialActions.setState({
        player: '1'
      });
      expect(uiReducer(initial, action)).to.equal(new UiRecord({player: '1'}));
    });

    it('removes entities from inventoryExpandedById', function() {
      const initial = new UiRecord({
        inventoryExpandedById: Map({
          '1': true
        })
      });
      const action = initialActions.setState({
        entitiesToRemove: List(['1'])
      });
      expect(uiReducer(initial, action).inventoryExpandedById).to.equal(Map());
    });

    it('replaces the active view if the entity is removed', function() {
      const initial = new UiRecord({
        activeEditorView: '1',
        editorViews: OrderedSet(['0', '1'])
      });
      const action = initialActions.setState({
        entitiesToRemove: List(['1'])
      });
      const newState = uiReducer(initial, action);
      expect(newState.editorViews).not.to.contain('1');
      expect(newState.activeEditorView).to.equal('0');
    });
  });
});
