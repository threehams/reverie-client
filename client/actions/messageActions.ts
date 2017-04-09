import { Dispatch } from 'redux';

import { setState } from '../../shared/actions/messageActions';

export { setState, SetState } from '../../shared/actions/messageActions';

import {
  AllowedObjectType,
  State,
} from '../records';

export interface StateDeltaJs {
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

export const setInitialState = (state: StateDeltaJs) => {
  return (dispatch: Dispatch<State>, getState: () => State) => {
    const currentState = getState();
    if (currentState.player.id) {
      return;
    }

    dispatch(setState(state));
  };
};
