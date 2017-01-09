import { List, Map, Set } from 'immutable';

import { Command, EntityState, Location, MessageTarget } from './';

export interface ServerStateDelta {
  availableCommands?: Set<Command>;
  entities?: EntityState;
  entitiesToRemove?: List<string>;
  location?: Location;
  messages?: Map<MessageTarget, string>;
  owner?: string;
  statusEffects?: Set<string>;
  target?: string;
  timestamp: number;
  observers?: List<string>;
}
