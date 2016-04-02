import {List, Record} from 'immutable';

export default Record({
  id: null,
  name: '',
  description: '',
  type: null,
  executable: false,
  entities: List(),
  health: 0,
  quantity: 1,
  maxHealth: 0
});
