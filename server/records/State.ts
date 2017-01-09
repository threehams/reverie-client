import { Record } from 'immutable';
import { CommandState, EntityNameState, EntityState, TransactionState } from '../records';

interface StateProps {
  command?: CommandState;
  entities?: EntityState;
  entityByName?: EntityNameState;
  transactions?: TransactionState;
}

export class State extends Record<StateProps>({
  command: undefined,
  entities: undefined,
  entityByName: undefined,
  transactions: undefined,
}) implements StateProps {
  public command: CommandState;
  public entities: EntityState;
  public entityByName: EntityNameState;
  public transactions: TransactionState;
}
