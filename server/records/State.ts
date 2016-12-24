import { Map, Record } from 'immutable';
import { CommandState, Entity } from '../records';

interface StateProps {
  command?: CommandState;
  entities?: Map<string, Entity>;
}

export class State extends Record<StateProps>({
  command: undefined,
  entities: undefined,
}) implements StateProps {
  public command: CommandState;
  public entities: Map<string, Entity>;
};
