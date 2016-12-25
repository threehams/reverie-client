import { fromJS, List, OrderedSet, Set } from 'immutable';
import { expect } from '../../__test__/configureExpect';

import * as editorActions from '../actions/editorActions';
import * as inventoryActions from '../actions/inventoryActions';
import { InventorySelectItems } from '../actions/inventoryActions';
import { SetState } from '../actions/messageActions';
import { InventoryExpandItems } from '../actions/playerActions';
import * as socketActions from '../actions/socketActions';
import { Ui } from '../records';
import uiReducer, { INITIAL_STATE } from './uiReducer';

describe('uiReducer', function() {
  describe('EDITOR_ADD_VIEW', function() {
    it('adds a new view and sets it as active', function() {
      const initial = new Ui({
        editorViews: OrderedSet(['3']),
      });
      const action = editorActions.addView('1');
      const newState = uiReducer(initial, action);
      expect(newState.editorViews).to.equal(OrderedSet(['3', '1']));
      expect(newState.activeEditorView).to.equal('1');
    });
  });

  describe('EDITOR_SET_ACTIVE_VIEW', function() {
    it('sets the view as active', function() {
      const initial = new Ui({
        activeEditorView: '1',
      });
      const action = editorActions.setActiveView('3');
      expect(uiReducer(initial, action).activeEditorView).to.equal('3');
    });
  });

  describe('EDITOR_REMOVE_VIEW', function() {
    context('when removing the current view', function() {
      it('sets the active view to the next available view', function() {
        const initial = new Ui({
          activeEditorView: '2',
          editorViews: OrderedSet(['1', '2', '3', '4']),
        });
        const action = editorActions.removeView('2');
        const newState = uiReducer(initial, action);
        expect(newState.editorViews).to.equal(OrderedSet(['1', '3', '4']));
        expect(newState.activeEditorView).to.equal('4');
      });
    });

    context('when removing a non-current view', function() {
      it('does not change the active view', function() {
        const initial = new Ui({
          activeEditorView: '2',
          editorViews: OrderedSet(['1', '2']),
        });
        const action = editorActions.removeView('1');
        const newState = uiReducer(initial, action);
        expect(newState.editorViews).to.equal(OrderedSet('2'));
        expect(newState.activeEditorView).to.equal('2');
      });
    });
  });

  describe('INVENTORY_SELECT_ITEMS', function() {
    it('sets the items to the list given', function() {
      const initial = new Ui({});
      const action: InventorySelectItems = {
        payload: {
          ids: List(['2', '3', '4']),
          owner: 'self',
        },
        type: 'INVENTORY_SELECT_ITEMS',
      };
      const newState = uiReducer(initial, action);
      expect(newState.selectedItems).to.equal(OrderedSet(['2', '3', '4']));
    });
  });

  describe('INVENTORY_EXPAND_ITEMS', function() {
    it('sets the item as expanded', function() {
      const initial = new Ui();
      const action: InventoryExpandItems = {
        payload: {
          ids: List(['1', '2']),
        },
        type: 'INVENTORY_EXPAND_ITEMS',
      };
      expect(uiReducer(initial, action)).to.equal(new Ui({
        inventoryExpandedById: Set(['1', '2']),
      }));
    });
  });

  describe('INVENTORY_TOGGLE_EXPAND', function() {
    it('toggles the expanded state', function() {
      const initial = new Ui();
      const action = inventoryActions.toggleExpand('1');
      expect(uiReducer(initial, action)).to.equal(new Ui(fromJS({
        inventoryExpandedById: Set('1'),
      })));
    });
  });

  describe('INVENTORY_TOGGLE_SELECT', function() {
    describe('when item is selected', function() {
      it('removes the item', function() {
        const initial = new Ui({
          selectedItems: OrderedSet(['1']),
        });
        const action = inventoryActions.toggleItem('1');
        expect(uiReducer(initial, action).selectedItems).not.to.contain('1');
      });
    });

    describe('when item is not selected', function() {
      it('adds the item', function() {
        const initial = new Ui();
        const action = inventoryActions.toggleItem('1');
        expect(uiReducer(initial, action).selectedItems).to.contain('1');
      });
    });
  });

  describe('PLAYER_SET_ACTIVE_VIEW', function() {
    it('sets the active view', function() {
      // derp
    });
  });

  describe('RESIZE_PANEL', function() {
    it('sets the size for the given property', function() {
      // derp
    });
  });

  describe('SET_STATE', function() {
    context('with a player', function() {
      it('replaces the player', function() {
        const initial = new Ui({ player: '2' });
        const action: SetState = {
          payload: {
            entitiesToRemove: List([]),
            player: '1',
          },
          type: 'SET_STATE',
        };
        expect(uiReducer(initial, action)).to.equal(new Ui({ player: '1' }));
      });
    });

    context('with a location', function() {
      it('replaces the player', function() {
        const initial = new Ui({ player: '2' });
        const action: SetState = {
          payload: {
            entitiesToRemove: List([]),
            player: '1',
          },
          type: 'SET_STATE',
        };
        expect(uiReducer(initial, action)).to.equal(new Ui({ player: '1' }));
      });
    });

    context('with no player or location', function() {
      it('keeps the existing data', function() {
        const initial = new Ui({ player: '1'  });
        const action: SetState = {
          payload: {
            entitiesToRemove: List([]),
          },
          type: 'SET_STATE',
        };
        expect(uiReducer(initial, action)).to.equal(new Ui({ player: '1' }));
      });
    });

    context('with status effects', function() {
      it('replacing the existing effects', function() {
        const initial = new Ui({ statusEffects: Set(['bees']) });
        const action: SetState = {
          payload: {
            entitiesToRemove: List([]),
            statusEffects: Set(['fire']),
          },
          type: 'SET_STATE',
        };
        expect(uiReducer(initial, action)).to.equal(new Ui({ statusEffects: Set(['fire']) }));
      });
    });

    it('removes entities from inventoryExpandedById', function() {
      const initial = new Ui({
        inventoryExpandedById: Set(['1']),
      });
      const action: SetState = {
        payload: {
          entitiesToRemove: List(['1']),
        },
        type: 'SET_STATE',
      };
      expect(uiReducer(initial, action).inventoryExpandedById).to.equal(Set());
    });

    it('replaces the active view if the entity is removed', function() {
      const initial = new Ui({
        activeEditorView: '1',
        editorViews: OrderedSet(['0', '1']),
      });
      const action: SetState = {
        payload: {
          entitiesToRemove: List(['1']),
        },
        type: 'SET_STATE',
      };
      const newState = uiReducer(initial, action);
      expect(newState.editorViews).not.to.contain('1');
      expect(newState.activeEditorView).to.equal('0');
    });
  });

  describe('SOCKET_STATUS', function() {
    it('updates the alert', function() {
      const action = socketActions.disconnected();
      expect(uiReducer(undefined, action).alert).to.equal(
        'Reconnecting to server, give it a minute...',
      );
    });
  });

  // describe('default', function() {
  //   it('returns the state', function() {
  //     expect(uiReducer(undefined, { type: 'UNRELATED' })).to.equal(INITIAL_STATE);
  //   });
  // });
});
