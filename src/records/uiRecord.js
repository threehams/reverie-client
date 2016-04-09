import {Record, Set, OrderedSet} from 'immutable';

export default Record({
  activeEditorView: '0',
  alert: null,
  currentCommand: '',
  activePlayerView: 'inventory',
  editorViews: OrderedSet(['0']),
  inventoryExpandedById: Set(),
  player: null,
  location: null,
  selectedItems: OrderedSet()
});
