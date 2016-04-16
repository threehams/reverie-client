import * as autocompleteSelectors from './autocompleteSelectors';
import {fromJS, List} from 'immutable';

import expect from '../__test__/configureExpect';

import EntityRecord from '../records/EntityRecord';
import CommandStateRecord from '../records/CommandStateRecord';

describe('autocompleteSelectors', function() {
  describe('availableOptions', function() {
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
          command: new CommandStateRecord({
            current: 'rm'
          })
        });

        expect(autocompleteSelectors.availableOptions(state)).to.equal(List([rmRecord, rmHackRecord]));
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
          command: new CommandStateRecord({
            autocompleteFragment: 'rm'
          })
        });

        expect(autocompleteSelectors.availableOptions(state)).to.equal(List([rmRfRecord]));
      });
    });
  });

  describe('selectedOption', function() {
    context('when selected option is available', function() {
      it('returns that option', function() {
        const rmRecord = new EntityRecord({
          id: '1',
          name: 'rm',
          type: 'executable'
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
          command: new CommandStateRecord({
            autocompleteFragment: 'rm',
            autocompleteSelectedItem: rmRfRecord
          })
        });

        expect(autocompleteSelectors.selectedOption(state)).to.equal(rmRfRecord);
      });
    });

    context('when selected option is not available', function() {
      it('returns the first available option', function() {
        const selectorRecord = new EntityRecord({
          id: '1',
          name: 'selector',
          type: 'executable'
        });
        const selectionRecord = new EntityRecord({
          id: '2',
          name: 'selection',
          type: 'executable'
        });
        const state = fromJS({
          entities: {
            '1': selectorRecord,
            '2': selectionRecord
          },
          command: new CommandStateRecord({
            autocompleteFragment: 'selecto',
            autocompleteSelectedItem: selectionRecord
          })
        });

        expect(autocompleteSelectors.selectedOption(state)).to.equal(selectorRecord);
      });
    });
  });
});
