import * as autocompleteSelectors from './autocompleteSelectors';
import {fromJS, List} from 'immutable';

import expect from '../__test__/configureExpect';

import EntityRecord from '../records/EntityRecord';
import CommandStateRecord from '../records/CommandStateRecord';

describe('autocompleteSelectors', function() {
  describe('availableOptions', function() {
    it('matches all entities', function() {
      const rmRecord = new EntityRecord({
        id: '1',
        name: 'rm',
      });
      const rmHackRecord = new EntityRecord({
        id: '2',
        name: 'rm-hack',
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

  describe('selectedOption', function() {
    context('when selected option is available', function() {
      it('returns that option', function() {
        const rmRecord = new EntityRecord({
          id: '1',
          name: 'rm',
        });
        const rmRfRecord = new EntityRecord({
          id: '2',
          name: 'rm-rf',
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
        });
        const selectionRecord = new EntityRecord({
          id: '2',
          name: 'selection',
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
