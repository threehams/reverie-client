import {List, fromJS} from 'immutable';
import expect from '../__test__/configureExpect';

import uiReducer from './ui-reducer';
import {setState} from '../actions/initial-actions';
import {toggleExpand} from '../actions/inventory-actions';
import {removeView} from '../actions/editor-actions';
import UiRecord from '../records/ui-record';
import EditorTabRecord from '../records/editor-tab-record';

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

  describe('EDITOR_REMOVE_VIEW', function() {
    context('when removing the current view', function() {
      it('sets the active view to the next available view', function() {
        const initial = new UiRecord({
          editorTabs: List([
            new EditorTabRecord({
              id: '1'
            }),
            new EditorTabRecord({
              id: '2'
            })
          ]),
          activeEditorView: '2'
        });
        const action = removeView('2');
        const newState = uiReducer(initial, action);
        expect(newState.activeEditorView).to.equal('1');
      });
    });

    context('when removing a non-current view', function() {
      it('does not change the active view', function() {
        const initial = new UiRecord({
          editorTabs: List([
            new EditorTabRecord({
              id: '1'
            })
          ]),
          activeEditorView: '2'
        });
        const action = removeView('1');
        const newState = uiReducer(initial, action);
        expect(newState.activeEditorView).to.equal('2');
      });
    });
  });
});
