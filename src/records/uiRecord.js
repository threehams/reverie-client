import {Record, Map, OrderedSet} from 'immutable';

export default Record({
  activeEditorView: '0',
  alert: null,
  currentCommand: '',
  activePlayerView: 'inventory',
  editorViews: OrderedSet(['0']),
  inventoryExpandedById: Map(),
  player: null,
  location: null,
  selectedItems: OrderedSet()
});
