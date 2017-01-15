import { List, Map, Set } from 'immutable';

import { Command, EntityState, Location, MessageTarget } from './';

export interface ServerStateDelta {
  availableCommands?: Set<Command>;
  entities?: EntityState;
  entitiesToRemove?: List<string>;
  entityAddedByPath?: string[];
  entityMovedByPath?: string[][];
  entityRemovedByPath?: string[];
  location?: Location;
  messages?: Map<MessageTarget, string>;
  observers?: List<string>;
  owner?: string;
  statusEffects?: Set<string>;
  target?: string;
  timestamp: number;
}
