import { Set, Record } from 'immutable';

interface AllowedProps {
  components?: Set<string>;
  names?: Set<string>;
  owners?: Set<string>;
  states?: Set<string>;
  types?: Set<string>;
}

export class Allowed extends Record<AllowedProps>({
  components: Set([]), // any valid component name, lowercase
  names: Set([]), // command name, overrides all other settings. used for conjunctions such as "to"
  owners: Set([]), // one of "player", "room"
  states: Set([]), // any valid state, lowercase. example: 'locked' or 'opened'
  types: Set([]), // one of "entity", "command", "exit"
}) implements AllowedProps {
  public components: Set<string>;
  public names: Set<string>;
  public owners: Set<string>;
  public states: Set<string>;
  public types: Set<string>;
};
