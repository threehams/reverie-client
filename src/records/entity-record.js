import {List, Record} from 'immutable';

export default Record({
  id: null,
  name: '',
  description: '',
  executable: false,
  entities: List()
});
