import { List, Record } from 'immutable';
import { CommandState, EntityState, Location, Ui } from './';

interface StateProps {
  command?: CommandState;
  editorHistory?: List<string>;
  entities?: EntityState;
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
  public entities: EntityState;
  public location: Location;
  public ui: Ui;
};
