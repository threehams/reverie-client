import { List, Map, Set } from 'immutable';

import { expect } from '../../__test__/configureExpect';
import { Allowed, Command, CommandPart, Entity } from '../records';
import * as messageActions from './messageActions';

describe('messageActions', function() {
  describe('setState', function() {
    it('converts command data to a set of records', function() {
      const stateData = {
        availableCommands: [
          {
            name: 'move',
            parts: [
              {
                allowed: [
                  {
                    components: ['unlockable'],
                    names: ['open'],
                    owners: ['floor'],
                    states: ['unlocked'],
                    types: ['entity'],
                  },
                ],
              },
            ],
          },
        ],
      };
      const expected = Set([
        new Command({
          name: 'move',
          parts: List([
            new CommandPart({
              allowed: List([
                new Allowed({
                  components: Set(['unlockable']),
                  names: Set(['open']),
                  owners: Set(['floor']),
                  states: Set(['unlocked']),
                  types: Set(['entity']),
                }),
              ]),
            }),
          ]),
        }),
      ]);
      expect(messageActions.setState(stateData).payload.availableCommands).to.equal(expected);
    });
  });

  describe('entities', function() {
    it('converts entity data to a map of records', function() {
      const stateData = {
        entities: {
          '1': {
            components: ['attackable'],
            entities: ['2'],
            id: '1',
            name: 'thing',
            states: ['attacking'],
          },
        },
      };

      const expected = Map({
        '1': new Entity({
          components: Set(['attackable']),
          entities: List(['2']),
          id: '1',
          name: 'thing',
          states: Set(['attacking']),
        }),
      });
      expect(messageActions.setState(stateData).payload.entities).to.equal(expected);
    });
  });
});
