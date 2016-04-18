import {Set, Record} from 'immutable';

export default Record({
  types: Set(), // one of "entity", "command", "exit"
  components: Set(), // any valid component name, lowercase
  owners: Set(), // one of "player", "room"
  names: Set() // command name, overrides all other settings. used for conjunctions such as "to"
});
