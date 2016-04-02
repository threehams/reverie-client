import {fromJS, List} from 'immutable';

import expect from '../__test__/configureExpect';

import { mapStateToProps } from './Autocomplete';
import EntityRecord from '../records/entity-record';

describe('Autocomplete', function() {
  describe('mapStateToProps', function() {
    context('executables', function() {
      it('matches all scripts', function() {
        const state = fromJS({
          entities: {
            '1': new EntityRecord({
              id: '1',
              name: 'rm',
              type: 'executable'
            }),
            '2': new EntityRecord({
              id: '2',
              name: 'rm-hack',
              type: 'executable'
            })
          }
        });
        const props = {
          command: 'rm'
        };

        expect(mapStateToProps(state, props).options).to.equal(List(['rm', 'rm-hack']));
      });
    });

    context('other items', function() {
      it('does not match files', function() {
        const state = fromJS({
          entities: {
            '1': new EntityRecord({
              id: '1',
              name: 'rm',
              type: 'text'
            }),
            '2': new EntityRecord({
              id: '2',
              name: 'rm-rf',
              type: 'executable'
            })
          }
        });
        const props = {
          command: 'rm'
        };

        expect(mapStateToProps(state, props).options).to.equal(List(['rm-rf']));
      });
    });
  });
});
