import * as autocompleteSelectors from './autocompleteSelectors';
import {fromJS, List, Set} from 'immutable';

import expect from '../__test__/configureExpect';

import EntityRecord from '../records/EntityRecord';
import CommandStateRecord from '../records/CommandStateRecord';
import CommandPartRecord from '../records/CommandPartRecord';
import CommandRecord from '../records/CommandRecord';
import AllowedRecord from '../records/AllowedRecord';

describe('autocompleteSelectors', function() {
  describe('applyAllowed', function() {
    context('when types are specified', function() {
      it('restricts the objects to the given types', function() {
        const commands = List([
          new CommandRecord({ name: 'command1' }),
          new CommandRecord({ name: 'command2' }),
        ]);
        const objects = commands.concat(List([
          new EntityRecord({ name: 'entity1' }),
          new EntityRecord({ name: 'entity2' }),
        ]));
        const allowed = new AllowedRecord({
          types: Set(['command'])
        });
        const filtered = autocompleteSelectors.applyAllowed(objects, allowed);
        expect(filtered).to.equal(commands);
      });
    });

    context('when types are not specified', function() {
      it('returns a flat map of all objects', function() {
        const objects = List([
          new CommandRecord({ name: 'command1' }),
          new CommandRecord({ name: 'command2' }),
          new EntityRecord({ name: 'entity1' }),
          new EntityRecord({ name: 'entity2' }),
        ]);
        const allowed = new AllowedRecord({
          types: Set()
        });
        const filtered = autocompleteSelectors.applyAllowed(objects, allowed);
        expect(filtered).to.equal(objects);
      });
    });

    context('when components are specified', function() {
      it('returns objects where any component matches', function() {
        const creature = new EntityRecord({
          id: '1',
          name: 'creature',
          components: Set(['creature'])
        });
        const item = new EntityRecord({
          id: '2',
          name: 'item',
          components: Set(['item'])
        });
        const container = new EntityRecord({
          id: '3',
          name: 'container',
          components: Set(['container'])
        });
        const objects = List([creature, item, container]);
        const allowed = new AllowedRecord({
          types: Set(['entity']),
          components: Set(['item', 'creature'])
        });
        const filtered = autocompleteSelectors.applyAllowed(objects, allowed);
        expect(filtered).to.equal(List([creature, item]));
      });
    });
  });

  describe('availableOptions', function() {
    context('with no current command', function() {
      it('matches commands and exits', function() {
        const commandTransfer = new CommandRecord({
          name: 'transfer'
        });

        const state = fromJS({
          command: new CommandStateRecord({
            autocompleteOpen: true,
            current: 'tr',
            cursorIndex: 2,
            available: Set([
              commandTransfer
            ])
          }),
          entities: {
            '1': new EntityRecord({
              id: '1',
              name: 'readme.txt'
            })
          }
        });

        expect(autocompleteSelectors.availableOptions(state)).to.equal(List([commandTransfer]));
      });
    });

    context('with a current command', function() {
      context('when the part filters by type', function() {
        it('returns the filtered and sorted list', function() {
          const commandTransfer = new CommandRecord({
            name: 'transfer',
            parts: List([
              new CommandPartRecord({
                allowed: List([
                  new AllowedRecord({
                    types: Set(['entity'])
                  })
                ])
              })
            ])
          });

          const entity = new EntityRecord({
            id: '1',
            name: 'readme.txt'
          });
          const state = fromJS({
            command: new CommandStateRecord({
              autocompleteOpen: true,
              current: 'transfer re',
              cursorIndex: 9,
              available: Set([
                commandTransfer
              ])
            }),
            entities: {
              '1': entity
            }
          });
          expect(autocompleteSelectors.availableOptions(state)).to.equal(List([
            entity
          ]));
        });
      });

      context('when the part filters by component', function() {
        it('returns the filtered and sorted list', function() {

        });
      });

      context('when the part filters by owner', function() {
        it('returns the filtered and sorted list', function() {

        });
      });

      context('when the part contains multiple allowed lists', function() {
        it('adds all possibilities to a single sorted list', function() {

        });
      });
    });
  });
});
