import { fromJS, List, Map, Set } from 'immutable';

import {
  Allowed,
  AllowedObjectType,
  Command,
  CommandPart,
  Entity,
  EntityState,
  Location,
  StateDelta,
} from '../records';

export interface SetState {
  payload: StateDelta;
  type: 'SET_STATE';
}

interface StateData {
  availableCommands?: CommandData[];
  entities?: EntityObjectMap;
  entitiesToRemove?: string[];
  message?: string;
  player?: string;
  location?: LocationData;
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

interface LocationData {
  name: string;
  description: string;
  entities?: string[];
  exits?: string[];
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
    entitiesToRemove: fromJS(stateData.entitiesToRemove) || List(),
    location: stateData.location && new Location(fromJS(stateData.location)),
    message: stateData.message || '',
    player: stateData.player,
    statusEffects: stateData.statusEffects && Set(stateData.statusEffects),
  },
  type: 'SET_STATE',
});

type EntityPair = [string, EntityData];

function createEntityMap(entities: EntityObjectMap): EntityState {
  if (!entities) {
    return Map({}) as EntityState;
  }
  return Object.entries(entities).reduce((entityMap: EntityState, [id, entity]: EntityPair): EntityState => {
    const entityProps = {
      ...entity,
      components: Set(entity.components),
      entities: List(entity.entities),
      exits: Set(entity.exits),
      states: Set(entity.states),
    };
    return entityMap.set(id, new Entity(entityProps));
  }, Map({}) as EntityState);
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
