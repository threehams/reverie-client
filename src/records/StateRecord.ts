import { List, Map, Record } from 'immutable';
import { CommandStateType, EntityType, LocationType, UiType } from './index';

interface State {
  command?: CommandStateType;
  editorHistory?: List<string>;
  entities?: Map<string, EntityType>;
  location?: LocationType;
  ui?: UiType;
}

export type StateType = State & Record.Base;

export const StateRecord = Record<State>({
  command: undefined,
  editorHistory: undefined,
  entities: undefined,
  location: undefined,
  ui: undefined,
});
