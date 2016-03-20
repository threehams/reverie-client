import {List, fromJS} from 'immutable';
import expect from '../__test__/configureExpect';

import commandHistoryReducer from './command-history-reducer';
import * as commandActions from '../actions/command-actions';
import { COMMAND_SEND } from '../actions/action-types';

describe('commandHistoryReducer', function() {
  describe('sendCommand', function() {
    it('adds the command to the history', function() {
      const initial = List(['git status']);
      const action = {
        type: COMMAND_SEND,
        payload: {
          command: 'git add .'
        }
      };
      expect(commandHistoryReducer(initial, action)).to.equal(fromJS(['git status', 'git add .']));
    });
  });

  describe('clear', function() {
    it('clears the history', function() {
      const initial = List(['git status']);
      const action = commandActions.clear();
      expect(commandHistoryReducer(initial, action)).to.equal(List());
    });
  });
});
