import {List, Record, Set} from 'immutable';

export default Record({
  autocompleteOpen: false,
  autocompletePosition: null,
  autocompleteSelectedItem: null,
  available: Set(),
  current: '',
  cursorIndex: 0,
  history: List(),
});
