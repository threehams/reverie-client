import {List, Set, fromJS} from 'immutable';
import expect from '../__test__/configureExpect';

import commandReducer, { INITIAL_STATE } from './commandReducer';
import { COMMAND_SEND, SET_STATE } from '../actions/actionTypes';
import * as commandActions from '../actions/commandActions';
import CommandRecord from '../records/CommandRecord';
import CommandPartRecord from '../records/CommandPartRecord';
import AllowedRecord from '../records/AllowedRecord';

import CommandStateRecord from '../records/CommandStateRecord';

describe('commandReducer', function() {
  describe('COMMAND_CLOSE_AUTOCOMPLETE', function() {
    it('resets autocomplete properties', function() {
      const initial = new CommandStateRecord({
        autocompleteOpen: true,
        autocompleteSelectedItem: 'a thing!',
        autocompletePosition: 1
      });
      const action = commandActions.closeAutocomplete();
      const expected = new CommandStateRecord({
        autocompleteOpen: false,
        autocompleteSelectedItem: null,
        autocompletePosition: null
      });
      expect(commandReducer(initial, action)).to.equal(expected);
    });
  });
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

      context('when cursor is at the end of the command', function() {
        it('adds a space', function() {
          const initial = new CommandStateRecord({
            autocompleteOpen: true
          });
          const action = commandActions.completeCommand('first sec third', 9, { name: 'second.js' });
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal('first second.js third');
        });
      });

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
          expect(newState.current).to.equal('first second econd third');
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

  describe('COMMAND_SELECT_AUTOCOMPLETE_ITEM', function() {
    it('sets the item', function() {
      const initial = undefined;
      const item = { name: 'oh hai mark' };
      const action = commandActions.selectAutocompleteItem(item);
      const expected = new CommandStateRecord({
        autocompleteSelectedItem: item
      });
      expect(commandReducer(initial, action)).to.equal(expected);
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

  describe('SET_STATE', function() {
    context('when availableCommands is empty', function() {
      it('returns the initial state', function() {
        const initial = new CommandStateRecord({
          available: { unrelated: 'stuff' }
        });
        const action = {
          type: SET_STATE,
          payload: {
            availableCommands: List()
          }
        };
        expect(commandReducer(initial, action)).to.equal(initial);
      });
    });

    context('when availableCommands contains commands', function() {
      it('merges existing commands with new commands', function() {
        const initial = new CommandStateRecord();
        const action = {
          type: SET_STATE,
          payload: {
            availableCommands: fromJS([
              {
                name: 'move',
                parts: [
                  {
                    allowed: [
                      {
                        components: ['container']
                      }
                    ]
                  }
                ]
              }
            ])
          }
        };
        const expected = new CommandStateRecord({
          available: Set([
            new CommandRecord({
              name: 'move',
              parts: List([
                new CommandPartRecord({
                  allowed: List([
                    new AllowedRecord({
                      components: Set(['container'])
                    })
                  ])
                })
              ])
            })
          ])
        });
        expect(commandReducer(initial, action)).to.equal(expected);
      });
    });
  });

  describe('default', function() {
    it('return default state', function() {
      expect(commandReducer(undefined, {})).to.equal(INITIAL_STATE);
    });
  });
});
