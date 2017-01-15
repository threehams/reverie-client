import { Record } from 'immutable';
import { CommandState, EntityState, TransactionState } from '../records';

interface StateProps {
  command?: CommandState;
  entities?: EntityState;
  transactions?: TransactionState;
}

export class State extends Record<StateProps>({
  command: undefined,
  entities: undefined,
  transactions: undefined,
}) implements StateProps {
  public command: CommandState;
  public entities: EntityState;
  public transactions: TransactionState;
}
