import { List, Record } from 'immutable';
import { CommandState, Entity, EntityState, Ui } from './';

interface StateProps {
  command?: CommandState;
  editorHistory?: List<string>;
  entities?: EntityState;
  location?: Entity;
  player?: Entity;
  ui?: Ui;
}

export class State extends Record<StateProps>({
  command: undefined,
  editorHistory: undefined,
  entities: undefined,
  location: undefined,
  player: undefined,
  ui: undefined,
}) implements StateProps {
  public command: CommandState;
  public editorHistory: List<string>;
  public entities: EntityState;
  public location: Entity;
  public player: Entity;
  public ui: Ui;
};
