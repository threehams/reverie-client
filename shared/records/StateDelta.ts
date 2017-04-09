import { Set } from 'immutable';
import { Command, Entity, EntityState } from './';

export interface StateDelta {
  availableCommands?: Set<Command>;
  entities?: EntityState;
  location?: Entity;
  message?: string;
  player?: Entity;
  statusEffects?: Set<string>;
}
