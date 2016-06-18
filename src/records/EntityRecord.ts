import {List, Record, Set} from 'immutable';

interface Entity {
  components?: Set<string>;
  currentHealth?: number;
  currentMemory?: number;
  currentStorage?: number;
  description?: string;
  entities?: List<string>;
  expanded?: boolean;
  id: string;
  indent?: number;
  maxHealth?: number;
  maxMemory?: number;
  maxStorage?: number;
  name: string;
  owner?: string;
  path?: string;
  quantity?: number;
  selected?: boolean;
  states?: Set<string>;
}

export type EntityType = Entity & Record.Base;

export const EntityRecord = Record<Entity>({
  components: Set([]),
  currentHealth: 0,
  currentMemory: 0,
  currentStorage: 0,
  description: '',
  entities: List([]),
  expanded: false,
  id: null,
  indent: 1,
  maxHealth: 0,
  maxMemory: 0,
  maxStorage: 0,
  name: '',
  owner: null,
  path: '',
  quantity: 1,
  selected: false,
  states: Set([]),
});
