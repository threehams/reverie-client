import { List, Set } from 'immutable';
import { Command, EntityState, Location } from './';

export interface StateDelta {
  availableCommands?: Set<Command>;
  entities?: EntityState;
  entitiesToRemove?: List<string>;
  location?: Location;
  message?: string;
  player?: string;
  statusEffects?: Set<string>;
}
