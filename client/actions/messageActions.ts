import { List, Set } from 'immutable';
import { Dispatch } from 'redux';

import { setState } from '../../shared/actions/messageActions';
import { EntityState } from '../records';

export { setState } from '../../shared/actions/messageActions';

import {
  AllowedObjectType,
  Command,
  Location,
  State,
} from '../records';

export interface StateDeltaJs {
  availableCommands?: CommandData[];
  entities?: EntityObjectMap;
  entitiesToRemove?: string[];
  message?: string;
  player?: string;
  location?: LocationData;
  statusEffects?: string[];
}

export type SetState = {
  type: 'SET_STATE';
  payload: {
    availableCommands?: Set<Command>;
    entities?: EntityState;
    entitiesToRemove?: List<string>;
    location?: Location;
    message?: string;
    player?: string;
    statusEffects?: Set<string>;
  }
};

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
  currentMemory?: number;
  currentStorage?: number;
  description?: string;
  entities?: string[];
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
  states?: string[];
}

export const setInitialState = (state: StateDeltaJs) => {
  return (dispatch: Dispatch<State>, getState: () => State) => {
    const currentState = getState();
    if (currentState.getIn(['ui', 'player'])) {
      return;
    }

    dispatch(setState(state));
  };
};
