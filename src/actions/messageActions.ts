import { Action } from 'redux-actions';
import { Dispatch } from 'redux';
import { fromJS, List, Map, Set } from 'immutable';

import { Allowed, Command, CommandPart, Entity, Location } from '../records';

export const SET_STATE = 'SET_STATE';
export type SET_STATE = {
  availableCommands?: Set<Command>;
  entities?: EntityMap;
  entitiesToRemove?: List<string>;
  location?: Location;
  message?: string;
  player?: string;
  statusEffects?: Set<string>;
};

type EntityMap = Map<string, Entity>;

interface StateData {
  availableCommands?: Array<CommandData>;
  entities?: EntityObjectMap;
  entitiesToRemove?: Array<string>;
  message?: string;
  player?: string;
  location?: LocationData;
  statusEffects?: Array<string>;
}

interface CommandData {
  name: string;
  parts?: Array<CommandPartData>;
}

interface CommandPartData {
  allowed: Array<AllowedData>;
}

interface AllowedData {
  types?: Array<string>;
  owners?: Array<string>;
  components?: Array<string>;
  states?: Array<string>;
  names?: Array<string>;
}

interface LocationData {
  name: string;
  description: string;
  entities?: Array<string>;
  exits?: Array<string>;
}

export interface EntityObjectMap {
  [id: string]: EntityData;
}

export interface EntityData {
  components?: Array<string>;
  currentHealth?: number;
  currentMemory?: number;
  currentStorage?: number;
  description?: string;
  entities?: Array<string>;
  expanded?: boolean;
  id: string;
  indent?: number;
  maxHealth?: number;
  maxMemory?: number;
  maxStorage?: number;
  name: string;
  owner?: string;
  path?: string;
  quantity?: number;
  selected?: boolean;
  states?: Array<string>;
}

export const setState = (stateData: StateData): Action<SET_STATE> => ({
  payload: {
    availableCommands: createCommandSet(stateData.availableCommands),
    entities: createEntityMap(stateData.entities),
    entitiesToRemove: fromJS(stateData.entitiesToRemove) || List(),
    location: stateData.location && new Location(fromJS(stateData.location)),
    message: stateData.message || '',
    player: stateData.player,
    statusEffects: stateData.statusEffects && Set(stateData.statusEffects),
  },
  type: SET_STATE,
});

export const setInitialState = (state: StateData) => {
  return (dispatch: Dispatch<Action<SET_STATE>>, getState) => {
    const currentState = getState();
    if (currentState.getIn(['ui', 'player'])) {
      return;
    }

    dispatch(setState(state));
  };
};

type EntityPair = [string, EntityData];

function createEntityMap(entities: EntityObjectMap): EntityMap {
  if (!entities) {
    return Map({});
  }
  return Object.entries(entities).reduce((entityMap: EntityMap, [id, entity]: EntityPair): EntityMap => {
    const entityProps: any = Object.assign(
      {},
      entity,
      {
        components: Set(entity.components),
        entities: List(entity.entities),
        states: Set(entity.states),
      }
    );
    return entityMap.set(id, new Entity(entityProps));
  }, Map({}));
}

function createCommandSet(commands: Array<CommandData>): Set<Command> {
  if (!commands) {
    return Set([]);
  }
  return commands.reduce((set, command) => {
    return set.add(createCommandRecord(command));
  }, Set([]));
}

function createCommandRecord(commandData: CommandData): Command {
  return new Command(Object.assign(
    {},
    commandData,
    {
      parts: List(commandData.parts.map((part) => {
        return new CommandPart(Object.assign(
          {},
          part,
          {
            allowed: List(part.allowed.map((allow) => {
              return new Allowed(Object.assign(
                {},
                allow,
                {
                  components: Set(allow.components),
                  names: Set(allow.names),
                  owners: Set(allow.owners),
                  states: Set(allow.states),
                  types: Set(allow.types),
                }
              ));
            })),
          }
        ));
      })),
    }
  ));
}
