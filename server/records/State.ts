import { Record } from 'immutable';
import { CommandState, EntityState } from '../records';

interface StateProps {
  command?: CommandState;
  entities?: EntityState;
}

export class State extends Record<StateProps>({
  command: undefined,
  entities: undefined,
}) implements StateProps {
  public command: CommandState;
  public entities: EntityState;
}
