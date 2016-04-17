import {List, Record, Set} from 'immutable';

export default Record({
  autocompleteFragment: '',
  autocompleteOpen: false,
  autocompleteSelectedItem: null,
  available: Set(),
  current: '',
  cursorIndex: 0,
  history: List(),
});
