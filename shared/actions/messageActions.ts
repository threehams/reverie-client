import { List, Map, Set } from 'immutable';

import {
  Allowed,
  AllowedObjectType,
  Command,
  CommandPart,
  Entity,
  EntityState,
  StateDelta,
} from '../records';

export interface SetState {
  payload: StateDelta;
  type: 'SET_STATE';
}

interface StateData {
  availableCommands?: CommandData[];
  entities?: EntityObjectMap;
  message?: string;
  player?: EntityData;
  location?: EntityData;
  statusEffects?: string[];
}

interface CommandData {
  name: string;
  parts?: CommandPartData[];
}

interface CommandPartData {
  allowed: AllowedData[];
}

interface AllowedData {
  types?: AllowedObjectType[];
  owners?: string[];
  components?: string[];
  states?: string[];
  names?: string[];
}

export interface EntityObjectMap {
  [id: string]: EntityData;
}

export interface EntityData {
  components?: string[];
  currentHealth?: number;
  currentStorage?: number;
  description?: string;
  entities?: string[];
  exits?: string[];
  expanded?: boolean;
  id: string;
  indent?: number;
  maxHealth?: number;
  maxStorage?: number;
  name: string;
  owner?: string;
  path?: string;
  quantity?: number;
  selected?: boolean;
  states?: string[];
}

export const setState = (stateData: StateData): SetState => ({
  payload: {
    availableCommands: createCommandSet(stateData.availableCommands),
    entities: createEntityMap(stateData.entities),
    location: stateData.location && createEntity(stateData.location),
    message: stateData.message || '',
    player: stateData.player && createEntity(stateData.player),
    statusEffects: stateData.statusEffects && Set(stateData.statusEffects),
  },
  type: 'SET_STATE',
});

type EntityPair = [string, EntityData];

function createEntityMap(entities: EntityObjectMap): EntityState {
  if (!entities) {
    return Map({}) as EntityState;
  }
  return Object.entries(entities).reduce((entityMap: EntityState, [id, entityData]: EntityPair): EntityState => {
    return entityMap.set(id, createEntity(entityData));
  }, Map({}) as EntityState);
}

function createEntity(entityData: EntityData): Entity {
  return new Entity({
    ...entityData,
    components: Set(entityData.components),
    entities: List(entityData.entities),
    exits: List(entityData.exits),
    states: Set(entityData.states),
  })
}

function createCommandSet(commands: CommandData[]): Set<Command> {
  if (!commands) {
    return Set([]);
  }
  return commands.reduce((set, command) => {
    return set.add(createCommandRecord(command));
  }, Set([]));
}

function createCommandRecord(commandData: CommandData): Command {
  return new Command({
    ...commandData,
    parts: List(commandData.parts.map((part) => new CommandPart({
      ...part,
      allowed: List(part.allowed.map((allow) => new Allowed({
        ...allow,
        components: Set(allow.components),
        names: Set(allow.names),
        owners: Set(allow.owners),
        states: Set(allow.states),
        types: Set(allow.types),
      }))),
    }))),
  });
}
