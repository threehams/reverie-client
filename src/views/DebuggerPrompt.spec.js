import {fromJS, List} from 'immutable';

import expect from '../__test__/configureExpect';

import { mapStateToProps } from './DebuggerPrompt';
import EntityRecord from '../records/entityRecord';
import UiRecord from '../records/uiRecord';

describe('DebuggerPrompt', function() {
  describe('mapStateToProps', function() {
    context('executables', function() {
      it('matches all scripts', function() {
        const rmRecord = new EntityRecord({
          id: '1',
          name: 'rm',
          type: 'executable'
        });
        const rmHackRecord = new EntityRecord({
          id: '2',
          name: 'rm-hack',
          type: 'executable'
        });
        const state = fromJS({
          entities: {
            '1': rmRecord,
            '2': rmHackRecord
          },
          ui: new UiRecord({
            currentCommand: 'rm'
          })
        });

        expect(mapStateToProps(state).autocompleteOptions).to.equal(List([rmRecord, rmHackRecord]));
      });
    });

    context('other items', function() {
      it('does not match files', function() {
        const rmRecord = new EntityRecord({
          id: '1',
          name: 'rm',
          type: 'text'
        });
        const rmRfRecord = new EntityRecord({
          id: '2',
          name: 'rm-rf',
          type: 'executable'
        });
        const state = fromJS({
          entities: {
            '1': rmRecord,
            '2': rmRfRecord
          },
          ui: new UiRecord({
            currentCommand: 'rm'
          })
        });

        expect(mapStateToProps(state).autocompleteOptions).to.equal(List([rmRfRecord]));
      });
    });
  });
});
