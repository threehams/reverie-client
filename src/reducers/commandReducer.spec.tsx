import { List, Set, fromJS } from 'immutable';
import { expect } from '../__test__/configureExpect';

import commandReducer, { INITIAL_STATE } from './commandReducer';
import { COMMAND_SEND, SET_STATE } from '../actions/actionTypes';
import * as commandActions from '../actions/commandActions';
import { Command, CommandState } from '../records';

describe('commandReducer', function() {
  describe('COMMAND_CLOSE_AUTOCOMPLETE', function() {
    it('resets autocomplete properties', function() {
      const initial = new CommandState({
        autocompleteOpen: true,
        autocompletePosition: 1,
        autocompleteSelectedItem: new Command({ name: 'a thing!'}),
      });
      const action = commandActions.closeAutocomplete();
      const expected = new CommandState({
        autocompleteOpen: false,
        autocompletePosition: null,
        autocompleteSelectedItem: null,
      });
      expect(commandReducer(initial, action)).to.equal(expected);
    });
  });
  describe('COMMAND_COMPLETE', function() {
    context('when autocomplete is closed', function() {
      it('returns the current command', function() {
        const initial = new CommandState({
          autocompleteOpen: false,
          current: 'run',
        });
        const command: Command = new Command({ name: 'run.js' });
        const action = commandActions.completeCommand('run', 3, command);
        const newState = commandReducer(initial, action);
        expect(newState.current).to.equal('run');
      });
    });

    context('when autocomplete is open', function() {
      context('when cursor is at the end of a part', function() {
        it('replaces that part of the command', function() {
          const initial = new CommandState({
            autocompleteOpen: true,
          });
          const action = commandActions.completeCommand('first sec third', 9, new Command({ name: 'second.js' }));
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal('first second.js third');
        });
      });

      context('when cursor is at the end of the command', function() {
        it('adds a space', function() {
          const initial = new CommandState({
            autocompleteOpen: true,
          });
          const action = commandActions.completeCommand('first sec third', 9, new Command({ name: 'second.js' }));
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal('first second.js third');
        });
      });

      context('when cursor is at the end of a part', function() {
        it('replaces that part of the command', function() {
          const initial = new CommandState({
            autocompleteOpen: true,
          });
          const action = commandActions.completeCommand('first sec third', 9, new Command({ name: 'second.js' }));
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal('first second.js third');
        });
      });

      context('when cursor is in the middle of a part', function() {
        it('replaces only the part of the command up to the cursor', function() {
          const initial = new CommandState({
            autocompleteOpen: true,
          });
          const action = commandActions.completeCommand('first second third', 7, new Command({ name: 'second' }));
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal('first second econd third');
        });
      });
    });
  });

  describe('COMMAND_HISTORY_CLEAR', function() {
    it('clears the history', function() {
      const initial = new CommandState({history: List(['git status'])});
      const action = commandActions.clear();
      expect(commandReducer(initial, action).history).to.equal(List());
    });
  });

  describe('COMMAND_SELECT_AUTOCOMPLETE_ITEM', function() {
    it('sets the item', function() {
      const initial = undefined;
      const item = new Command({ name: 'oh hai mark' });
      const action = commandActions.selectAutocompleteItem(item);
      const expected = new CommandState({
        autocompleteSelectedItem: item,
      });
      expect(commandReducer(initial, action)).to.equal(expected);
    });
  });

  describe('COMMAND_SEND', function() {
    it('adds the command to the history', function() {
      const initial = new CommandState({history: List(['git status'])});
      const action = {
        payload: {
          command: 'git add .',
        },
        type: COMMAND_SEND,
      };
      expect(commandReducer(initial, action).history).to.equal(fromJS(['git status', 'git add .']));
    });

    it('clears the current command and cursorIndex', function() {
      const initial = new CommandState({
        current: 'get inventory',
        cursorIndex: 11,
      });
      const action = {
        payload: {
          command: 'do something else',
        },
        type: COMMAND_SEND,
      };
      const newState = commandReducer(initial, action);
      expect(newState.current).to.equal('');
      expect(newState.cursorIndex).to.equal(0);
    });
  });

  describe('COMMAND_SET_CURRENT', function() {
    context('when new command is shorter', function() {
      it('closes autocomplete', function() {
        const initial = new CommandState({
          autocompleteOpen: true,
          current: 'get inv',
          cursorIndex: 6,
        });
        const action = commandActions.setCurrentCommand('get in', 5);
        const newState = commandReducer(initial, action);
        expect(newState.current).to.equal('get in');
        expect(newState.cursorIndex).to.equal(5);
        expect(newState.autocompleteOpen).to.be.false;
      });
    });

    context('when new command is longer', function() {
      context('when new command ends with a space', function() {
        it('closes autocomplete', function() {
          const initial = new CommandState({
            current: 'get inv',
            cursorIndex: 6,
          });
          const action = commandActions.setCurrentCommand('get inv ', 8);
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal('get inv ');
          expect(newState.cursorIndex).to.equal(8);
          expect(newState.autocompleteOpen).to.be.false;
        });
      });

      context('when new command ends with a non-space character', function() {
        it('opens autocomplete and sets the autocomplete item', function() {
          const initial = new CommandState({
            current: 'get inv',
            cursorIndex: 6,
          });
          const action = commandActions.setCurrentCommand('get inve', 8);
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal('get inve');
          expect(newState.cursorIndex).to.equal(8);
          expect(newState.autocompleteOpen).to.be.true;
        });
      });
    });
  });

  describe('COMMAND_SET_CURSOR_INDEX', function() {
    context('when cursor index jumps more than one character', function() {
      it('closes autocomplete and clears the autocomplete item', function() {
        const initial = new CommandState({
          autocompleteOpen: true,
          autocompleteSelectedItem: new Command({name: 'thing'}),
          current: 'first second third',
          cursorIndex: 6,
        });
        const action = commandActions.setCursorIndex(8);
        const newState = commandReducer(initial, action);
        expect(newState.cursorIndex).to.equal(8);
        expect(newState.autocompleteOpen).to.be.false;
        expect(newState.autocompleteSelectedItem).to.be.null;
      });
    });

    context('when cursor index moves by 1', function() {
      context('when autocomplete is closed', function() {
        it('keeps autocomplete closed', function() {
          const initial = new CommandState({
            autocompleteOpen: false,
            current: 'first second third',
            cursorIndex: 7,
          });
          const action = commandActions.setCursorIndex(8);
          const newState = commandReducer(initial, action);
          expect(newState.cursorIndex).to.equal(8);
          expect(newState.autocompleteOpen).to.be.false;
          expect(newState.autocompleteSelectedItem).to.be.null;
        });
      });

      context('when autocomplete is open', function() {
        context('when cursor moves outside the current command', function() {
          it('closes autocomplete and clears the autocomplete item', function() {
            const initial = new CommandState({
              autocompleteOpen: true,
              autocompleteSelectedItem: new Command({name: 'thing'}),
              current: 'first second third',
              cursorIndex: 6,
            });
            const action = commandActions.setCursorIndex(5);
            const newState = commandReducer(initial, action);
            expect(newState.cursorIndex).to.equal(5);
            expect(newState.autocompleteOpen).to.be.false;
            expect(newState.autocompleteSelectedItem).to.be.null;
          });
        });

        context('when cursor stays within the current command', function() {
          it('keeps autocomplete open', function() {
            const initial = new CommandState({
              autocompleteOpen: true,
              current: 'first second third',
              cursorIndex: 7,
            });
            const action = commandActions.setCursorIndex(8);
            const newState = commandReducer(initial, action);
            expect(newState.cursorIndex).to.equal(8);
            expect(newState.autocompleteOpen).to.be.true;
          });
        });
      });
    });
  });

  describe('SET_STATE', function() {
    context('when availableCommands is empty', function() {
      it('returns the initial state', function() {
        const initial = new CommandState({
          available: Set([]),
        });
        const action = {
          payload: {
            availableCommands: List(),
          },
          type: SET_STATE,
        };
        expect(commandReducer(initial, action)).to.equal(initial);
      });
    });

    context('when availableCommands contains commands', function() {
      it('merges existing commands with new commands', function() {
        const transfer = new Command({ name: 'transfer' });
        const move = new Command({ name: 'move' });
        const initial = new CommandState({
          available: Set([ transfer ]),
        });
        const action = {
          payload: {
            availableCommands: Set([ move ]),
          },
          type: SET_STATE,
        };
        const expected = new CommandState({
          available: Set([transfer, move]),
        });
        expect(commandReducer(initial, action)).to.equal(expected);
      });
    });
  });

  describe('default', function() {
    it('return default state', function() {
      expect(commandReducer(undefined, { type: 'UNRELATED' })).to.equal(INITIAL_STATE);
    });
  });
});
