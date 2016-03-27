import {List, fromJS} from 'immutable';
import expect from '../__test__/configureExpect';

import editorHistoryReducer from './editor-history-reducer';
import * as editorActions from '../actions/editor-actions';
import * as initialActions from '../actions/initial-actions';

describe('editorHistoryReducer', function() {
  describe('sendCommand', function() {
    context('with a message', function() {
      it('adds the command to the history with a trailing blank line', function() {
        const initial = List(['Hello.', '']);
        const action = initialActions.setState({
          message: 'You drop the USB drive.\nCongratulations.'
        });
        expect(editorHistoryReducer(initial, action)).to.equal(fromJS([
          'Hello.',
          '',
          'You drop the USB drive.',
          'Congratulations.',
          ''
        ]));
      });
    });

    context('with no message', function() {
      it('returns the state', function() {
        const initial = List(['Hello.', '']);
        const action = initialActions.setState({
          unrelated: 'Oh hai mark'
        });
        expect(editorHistoryReducer(initial, action)).to.equal(fromJS([
          'Hello.',
          ''
        ]));
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
});
