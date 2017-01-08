import { List, Record, Set } from 'immutable';

interface EntityProps {
  components?: Set<string>;
  currentHealth?: number;
  currentStorage?: number;
  description?: string;
  entities?: List<string>;
  exits?: Set<string>;
  expanded?: boolean;
  id: string;
  indent?: number;
  maxHealth?: number;
  maxStorage?: number;
  name: string;
  owner?: string;
  path?: string;
  quantity?: number;
  selected?: boolean;
  states?: Set<string>;
}

export class Entity extends Record<EntityProps>({
  components: Set([]),
  currentHealth: 0,
  currentStorage: 0,
  description: '',
  entities: List([]),
  exits: Set([]),
  expanded: false,
  id: null,
  indent: 1,
  maxHealth: 0,
  maxStorage: 0,
  name: '',
  owner: null,
  path: '',
  quantity: 1,
  selected: false,
  states: Set([]),
}) implements EntityProps {
  public components: Set<string>;
  public currentHealth: number;
  public currentStorage: number;
  public description: string;
  public entities: List<string>;
  public exits: Set<string>;
  public expanded: boolean;
  public id: string;
  public indent: number;
  public maxHealth: number;
  public maxStorage: number;
  public name: string;
  public owner: string;
  public path: string;
  public quantity: number;
  public selected: boolean;
  public states: Set<string>;
};
