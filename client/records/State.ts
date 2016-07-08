import { List, Map, Record } from 'immutable';
import { CommandState, Entity, Location, Ui } from './';

interface StateProps {
  command?: CommandState;
  editorHistory?: List<string>;
  entities?: Map<string, Entity>;
  location?: Location;
  ui?: Ui;
}

export class State extends Record<StateProps>({
  command: undefined,
  editorHistory: undefined,
  entities: undefined,
  location: undefined,
  ui: undefined,
}) implements StateProps {
  public command: CommandState;
  public editorHistory: List<string>;
  public entities: Map<string, Entity>;
  public location: Location;
  public ui: Ui;
};
