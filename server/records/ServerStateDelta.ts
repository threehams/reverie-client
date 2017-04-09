import { List, Map } from 'immutable';

import { EntityState, MessageTarget } from './';

export interface ServerStateDelta {
  entities?: EntityState;
  messages?: Map<MessageTarget, string>;
  observers?: List<string>;
  owner?: string;
  target?: string;
  timestamp: number;
}
