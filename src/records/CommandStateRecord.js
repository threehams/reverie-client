import {List, Record} from 'immutable';

export default Record({
  cursorIndex: 0,
  current: '',
  history: List(),
  autocompleteOpen: false,
  autocompleteSelectedItem: null,
  autocompleteFragment: ''
});
