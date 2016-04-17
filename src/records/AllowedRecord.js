import {Set, Record} from 'immutable';

export default Record({
  types: Set(), // one of "entity", "command", "exit"
  components: Set(), // any valid component name
  owners: Set() // one of "player", "room", "creature"
});
