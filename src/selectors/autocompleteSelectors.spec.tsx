import * as autocompleteSelectors from './autocompleteSelectors';
import { List, Map, Set } from 'immutable';

import { expect } from '../__test__/configureExpect';

import {
  Allowed,
  CommandPart,
  Command,
  CommandState,
  Entity,
  Exit,
  Location,
  State,
  Ui,
} from '../records';

describe('autocompleteSelectors', function() {
  describe('applyAllowed', function() {
    context('when types are specified', function() {
      it('restricts the objects to the given types', function() {
        const commands = List([
          new Command({ name: 'command1' }),
          new Command({ name: 'command2' }),
        ]);
        const objects = commands.concat(List([
          new Entity({ id: '1', name: 'entity1' }),
          new Entity({ id: '2', name: 'entity2' }),
        ]));
        const allowed = new Allowed({
          types: Set(['command']),
        });
        const filtered = autocompleteSelectors.applyAllowed(objects, allowed);
        expect(filtered).to.equal(commands);
      });
    });

    context('when types are not specified', function() {
      it('returns a flat map of all objects', function() {
        const objects = List([
          new Command({ name: 'command1' }),
          new Command({ name: 'command2' }),
          new Entity({ id: '1', name: 'entity1' }),
          new Entity({ id: '2', name: 'entity2' }),
        ]);
        const allowed = new Allowed({
          types: Set([]),
        });
        const filtered = autocompleteSelectors.applyAllowed(objects, allowed);
        expect(filtered).to.equal(objects);
      });
    });

    context('when components are specified', function() {
      it('returns objects where any component matches', function() {
        const creature = new Entity({
          components: Set(['creature']),
          id: '1',
          name: 'creature',
        });
        const item = new Entity({
          components: Set(['item']),
          id: '2',
          name: 'item',
        });
        const container = new Entity({
          components: Set(['container']),
          id: '3',
          name: 'container',
        });
        const objects = List([creature, item, container]);
        const allowed = new Allowed({
          components: Set(['item', 'creature']),
          types: Set(['entity']),
        });
        const filtered = autocompleteSelectors.applyAllowed(objects, allowed);
        expect(filtered).to.equal(List([creature, item]));
      });
    });
  });

  describe('availableOptions', function() {
    context('with no current command', function() {
      it('matches commands and exits', function() {
        const commandTransfer = new Command({
          name: 'stash',
        });

        const state = new State({
          command: new CommandState({
            autocompleteOpen: true,
            available: Set([
              commandTransfer,
            ]),
            current: 's',
            cursorIndex: 1,
          }),
          entities: Map({
            '1': new Entity({
              id: '1',
              name: 'readme.txt',
            }),
          }),
          location: new Location({
            exits: List(['south']),
          }),
          ui: new Ui(),
        });

        const exit = new Exit({ name: 'south'});
        expect(autocompleteSelectors.availableOptions(state)).to.equal(List([exit, commandTransfer]));
      });
    });

    context('with a current command', function() {
      context('when the part filters by type', function() {
        it('returns the filtered and sorted list', function() {
          const commandTransfer = new Command({
            name: 'transfer',
            parts: List([
              new CommandPart({
                allowed: List([
                  new Allowed({
                    types: Set(['entity']),
                  }),
                ]),
              }),
            ]),
          });

          const entity = new Entity({
            id: '1',
            name: 'readme.txt',
          });
          const state = new State({
            command: new CommandState({
              autocompleteOpen: true,
              available: Set([
                commandTransfer,
              ]),
              current: 'transfer re',
              cursorIndex: 9,
            }),
            entities: Map({
              '1': entity,
            }),
            location: new Location(),
            ui: new Ui(),
          });
          expect(autocompleteSelectors.availableOptions(state)).to.equal(List([
            entity,
          ]));
        });
      });

      context('when the part filters by component', function() {
        it('returns the filtered and sorted list', function() {
          // derp
        });
      });

      context('when the part filters by owner', function() {
        it('returns the filtered and sorted list', function() {
          // derp
        });
      });

      context('when the part contains multiple allowed lists', function() {
        it('adds all possibilities to a single sorted list', function() {
          // derp
        });
      });
    });
  });
});
