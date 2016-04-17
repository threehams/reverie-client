import {List, fromJS} from 'immutable';
import expect from '../__test__/configureExpect';

import commandReducer from './commandReducer';
import * as commandActions from '../actions/commandActions';
import CommandStateRecord from '../records/CommandStateRecord';
import { COMMAND_SEND } from '../actions/actionTypes';

describe('commandReducer', function() {
  describe('COMMAND_COMPLETE', function() {
    context('when autocomplete is closed', function() {
      it('returns the current command', function() {
        const initial = new CommandStateRecord({
          autocompleteOpen: false,
          current: 'run'
        });
        const action = commandActions.completeCommand('run', 3, { name: 'run.js' });
        const newState = commandReducer(initial, action);
        expect(newState.current).to.equal('run');
      });
    });

    context('when autocomplete is open', function() {
      context('when cursor is at the end of a part', function() {
        it('replaces that part of the command', function() {
          const initial = new CommandStateRecord({
            autocompleteOpen: true
          });
          const action = commandActions.completeCommand('first sec third', 9, { name: 'second.js' });
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal('first second.js third');
        });
      });

      context('when cursor is in the middle of a part', function() {
        it('replaces only the part of the command up to the cursor', function() {
          const initial = new CommandStateRecord({
            autocompleteOpen: true
          });
          const action = commandActions.completeCommand('first second third', 7, { name: 'second' });
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal('first secondecond third');
        });
      });
    });
  });

  describe('COMMAND_HISTORY_CLEAR', function() {
    it('clears the history', function() {
      const initial = new CommandStateRecord({history: List(['git status'])});
      const action = commandActions.clear();
      expect(commandReducer(initial, action).history).to.equal(List());
    });
  });

  describe('COMMAND_SEND', function() {
    it('adds the command to the history', function() {
      const initial = new CommandStateRecord({history: List(['git status'])});
      const action = {
        type: COMMAND_SEND,
        payload: {
          command: 'git add .'
        }
      };
      expect(commandReducer(initial, action).history).to.equal(fromJS(['git status', 'git add .']));
    });

    it('clears the current command and cursorIndex', function() {
      const initial = new CommandStateRecord({
        current: 'get inventory',
        cursorIndex: 11
      });
      const action = {
        type: COMMAND_SEND,
        payload: {
          command: 'do something else'
        }
      };
      const newState = commandReducer(initial, action);
      expect(newState.current).to.equal('');
      expect(newState.cursorIndex).to.equal(0);
    });
  });

  describe('COMMAND_SET_CURRENT', function() {
    context('when new command is shorter', function() {
      it('closes autocomplete', function() {
        const initial = new CommandStateRecord({
          current: 'get inv',
          cursorIndex: 6,
          autocompleteOpen: true
        });
        const action = commandActions.setCurrentCommand('get in', 5);
        const newState = commandReducer(initial, action);
        expect(newState.current).to.equal('get in');
        expect(newState.cursorIndex).to.equal(5);
        expect(newState.autocompleteOpen).to.be.false();
      });
    });

    context('when new command is longer', function() {
      context('when new command ends with a space', function() {
        it('closes autocomplete', function() {
          const initial = new CommandStateRecord({
            current: 'get inv',
            cursorIndex: 6
          });
          const action = commandActions.setCurrentCommand('get inv ', 8);
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal('get inv ');
          expect(newState.cursorIndex).to.equal(8);
          expect(newState.autocompleteOpen).to.be.false();
        });
      });

      context('when new command ends with a non-space character', function() {
        it('opens autocomplete and sets the autocomplete item', function() {
          const initial = new CommandStateRecord({
            current: 'get inv',
            cursorIndex: 6
          });
          const action = commandActions.setCurrentCommand('get inve', 8);
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal('get inve');
          expect(newState.cursorIndex).to.equal(8);
          expect(newState.autocompleteOpen).to.be.true();
        });
      });
    });
  });

  describe('COMMAND_SET_CURSOR_INDEX', function() {
    context('when cursor index jumps more than one character', function() {
      it('closes autocomplete and clears the autocomplete item', function() {
        const initial = new CommandStateRecord({
          current: 'first second third',
          cursorIndex: 6,
          autocompleteOpen: true,
          autocompleteSelectedItem: 'thing'
        });
        const action = commandActions.setCursorIndex(8);
        const newState = commandReducer(initial, action);
        expect(newState.cursorIndex).to.equal(8);
        expect(newState.autocompleteOpen).to.be.false();
        expect(newState.autocompleteSelectedItem).to.be.null();
      });
    });

    context('when cursor index moves by 1', function() {
      context('when autocomplete is closed', function() {
        it('keeps autocomplete closed', function() {
          const initial = new CommandStateRecord({
            current: 'first second third',
            cursorIndex: 7,
            autocompleteOpen: false
          });
          const action = commandActions.setCursorIndex(8);
          const newState = commandReducer(initial, action);
          expect(newState.cursorIndex).to.equal(8);
          expect(newState.autocompleteOpen).to.be.false();
          expect(newState.autocompleteSelectedItem).to.be.null();
        });
      });

      context('when autocomplete is open', function() {
        context('when cursor moves outside the current command', function() {
          it('closes autocomplete and clears the autocomplete item', function() {
            const initial = new CommandStateRecord({
              current: 'first second third',
              cursorIndex: 6,
              autocompleteOpen: true,
              autocompleteSelectedItem: 'thing'
            });
            const action = commandActions.setCursorIndex(5);
            const newState = commandReducer(initial, action);
            expect(newState.cursorIndex).to.equal(5);
            expect(newState.autocompleteOpen).to.be.false();
            expect(newState.autocompleteSelectedItem).to.be.null();
          });
        });

        context('when cursor stays within the current command', function() {
          it('keeps autocomplete open', function() {
            const initial = new CommandStateRecord({
              current: 'first second third',
              cursorIndex: 7,
              autocompleteOpen: true
            });
            const action = commandActions.setCursorIndex(8);
            const newState = commandReducer(initial, action);
            expect(newState.cursorIndex).to.equal(8);
            expect(newState.autocompleteOpen).to.be.true();
          });
        });
      });
    });
  });
});
