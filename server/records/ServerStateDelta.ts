import { List, Map } from 'immutable';

import { EntityState, Location, MessageTarget } from './';

export interface ServerStateDelta {
  entities?: EntityState;
  location?: Location;
  messages?: Map<MessageTarget, string>;
  observers?: List<string>;
  owner?: string;
  target?: string;
  timestamp: number;
}
