import { List } from 'immutable';
import { ServerStateDelta } from './';

export type TransactionState = List<Transaction>;

export interface Transaction extends ServerStateDelta {
  timestamp: number;
}
