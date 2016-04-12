import { List, Record } from 'immutable';

export default Record({
  id: null,
  name: '',
  description: '',
  type: null,
  executable: false,
  entities: List(),
  currentHealth: 0,
  currentMemory: 0,
  currentStorage: 0,
  quantity: 1,
  maxHealth: 0,
  maxMemory: 0,
  maxStorage: 0,
});
