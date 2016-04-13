import {Record, Set, OrderedSet} from 'immutable';

export default Record({
  activeEditorView: '0',
  autocompleteOpen: false,
  alert: null,
  currentCommand: '',
  activePlayerView: 'inventory',
  editorViews: OrderedSet(['0']),
  inventoryExpandedById: Set(),
  player: null,
  location: null,
  selectedAutocompleteIndex: 0,
  selectedItems: OrderedSet(),
});
