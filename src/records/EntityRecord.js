import {List, Record, Set} from 'immutable';

export default Record({
  components: Set(),
  currentHealth: 0,
  currentMemory: 0,
  currentStorage: 0,
  description: '',
  entities: List(),
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
  states: Set(),
});
