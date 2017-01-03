import { List } from 'immutable';
import { Command, EntityState } from './';

export interface StateDelta {
  availableCommands?: Set<Command>;
  entities?: EntityState;
  entitiesToRemove?: List<string>;
  location?: Location;
  message?: string;
  player?: string;
  statusEffects?: Set<string>;
}
