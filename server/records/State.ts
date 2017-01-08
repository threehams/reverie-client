import { Record } from 'immutable';
import { CommandState, EntityNameState, EntityState } from '../records';

interface StateProps {
  command: CommandState;
  entities: EntityState;
  entityByName: EntityNameState;
}

export class State extends Record<StateProps>({
  command: undefined,
  entities: undefined,
  entityByName: undefined,
}) implements StateProps {
  public command: CommandState;
  public entities: EntityState;
  public entityByName: EntityNameState;
}
