import {List, fromJS} from 'immutable';
import expect from '../__test__/configureExpect';

import commandHistoryReducer from './command-history-reducer';
import * as historyActions from '../actions/history-actions';
import {setState} from '../actions/initial-actions';

describe('commandHistoryReducer', function() {
  describe('SET_STATE', function() {
    it('returns the inventory ids', function() {
      const initial = undefined;
      const action = setState(fromJS({
        commandHistory: ['git status']
      }));
      expect(commandHistoryReducer(initial, action)).to.equal(fromJS(['git status']));
    });
  });

  describe('SEND_COMMAND', function() {
    it('adds the command to the history', function() {
      const initial = List(['git status']);
      const action = historyActions.sendCommand('git add .');
      expect(commandHistoryReducer(initial, action)).to.equal(fromJS(['git status', 'git add .']));
    });
  });

  describe('HISTORY_CLEAR', function() {
    it('clears the history', function() {
      const initial = List(['git status']);
      const action = historyActions.clear();
      expect(commandHistoryReducer(initial, action)).to.equal(List());
    });
  });
});
