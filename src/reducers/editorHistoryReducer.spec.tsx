import {List, fromJS} from 'immutable';
import { expect } from '../__test__/configureExpect';

import editorHistoryReducer, { INITIAL_STATE } from './editorHistoryReducer';
import * as editorActions from '../actions/editorActions';
import { SET_STATE } from '../actions/actionTypes';

describe('editorHistoryReducer', function() {
  describe('sendCommand', function() {
    context('with a message', function() {
      it('adds the command to the history with a trailing blank line', function() {
        const initial = List(['Hello.']);
        const action = {
          payload: {
            message: 'You drop the USB drive.\nCongratulations.',
          },
          type: SET_STATE,
        };
        expect(editorHistoryReducer(initial, action)).to.equal(fromJS([
          'Hello.',
          '',
          'You drop the USB drive.',
          'Congratulations.',
        ]));
      });
    });

    context('with no message', function() {
      it('returns the state', function() {
        const initial = List(['Hello.', '']);
        const action = {
          payload: {
            unrelated: 'Oh hai mark',
          },
          type: SET_STATE,
        };
        expect(editorHistoryReducer(initial, action)).to.equal(fromJS([
          'Hello.',
          '',
        ]));
      });
    });

    context('when state is empty', function() {
      it('does not prepend a blank line', function() {
        const initial = List([]);
        const action = {
          payload: {
            message: 'Oh hai mark',
          },
          type: SET_STATE,
        };
        expect(editorHistoryReducer(initial, action)).to.equal(fromJS(['Oh hai mark']));
      });
    });
  });

  describe('EDITOR_HISTORY_CLEAR', function() {
    it('clears the history', function() {
      const initial = List(['You are standing in an open field']);
      const action = editorActions.clear();
      expect(editorHistoryReducer(initial, action)).to.equal(List());
    });
  });

  describe('default', function() {
    it('return default state', function() {
      expect(editorHistoryReducer(undefined, { type: 'UNRELATED' })).to.equal(INITIAL_STATE);
    });
  });
});
