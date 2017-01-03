import { List, Map, Record } from 'immutable';
import { Command, Entity } from '../records';

type EntityMap = Map<string, Entity>;

interface StateDeltaProps {
  availableCommands?: Set<Command>;
  entities?: EntityMap;
  entitiesToRemove?: List<string>;
  location?: Location;
  message?: string;
  player?: string;
  statusEffects?: Set<string>;
}

export class StateDelta extends Record<StateDeltaProps>({
  availableCommands: undefined,
  entities: undefined,
  entitiesToRemove: undefined,
  location: undefined,
  message: undefined,
  player: undefined,
  statusEffects: undefined,
}) implements StateDeltaProps {
  public availableCommands: Set<Command>;
  public entities: EntityMap;
  public entitiesToRemove: List<string>;
  public location: Location;
  public message: string;
  public player: string;
  public statusEffects: Set<string>;
}
