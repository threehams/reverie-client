import { List, Map, Set } from 'immutable';

import { Command, Entity, Location } from '../records';

export type SetState = {
  type: 'SET_STATE';
  payload: {
    availableCommands?: Set<Command>;
    entities?: EntityMap;
    entitiesToRemove?: List<string>;
    location?: Location;
    message?: string;
    player?: string;
    statusEffects?: Set<string>;
  }
};

type EntityMap = Map<string, Entity>;
