import {Set, Record} from 'immutable';

interface Allowed {
  components?: Set<string>;
  names?: Set<string>;
  owners?: Set<'self' | 'floor'>;
  states?: Set<string>;
  types?: Set<string>;
}

export type AllowedType = Allowed & Record.Base;

export const AllowedRecord = Record<Allowed>({
  components: Set([]), // any valid component name, lowercase
  names: Set([]), // command name, overrides all other settings. used for conjunctions such as "to"
  owners: Set([]), // one of "player", "room"
  states: Set([]), // any valid state, lowercase. example: 'locked' or 'opened'
  types: Set([]), // one of "entity", "command", "exit"
});
