import {List, fromJS} from 'immutable';
import expect from '../__test__/configureExpect';

import commandHistoryReducer from './command-history-reducer';
import * as commandActions from '../actions/command-actions';

describe('commandHistoryReducer', function() {
  describe('HISTORY_FETCH_FULFILLED', function() {
    it('returns the inventory ids', function() {
      const initial = undefined;
      const action = {
        type: 'HISTORY_FETCH_FULFILLED',
        payload: {
          commandHistory: List(['git status'])
        }
      };
      expect(commandHistoryReducer(initial, action)).to.equal(fromJS(['git status']));
    });
  });

  describe('SEND_COMMAND', function() {
    it('adds the command to the history', function() {
      const initial = List(['git status']);
      const action = commandActions.sendCommand('git add .');
      expect(commandHistoryReducer(initial, action)).to.equal(fromJS(['git status', 'git add .']));
    });
  });

  describe('HISTORY_CLEAR', function() {
    it('clears the history', function() {
      const initial = List(['git status']);
      const action = commandActions.clear();
      expect(commandHistoryReducer(initial, action)).to.equal(List());
    });
  });
});
