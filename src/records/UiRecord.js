import {Record, Set, OrderedSet} from 'immutable';

export default Record({
  activeEditorView: '0',
  alert: null,
  activePlayerView: 'inventory',
  editorViews: OrderedSet(['0']),
  inventoryExpandedById: Set(),
  player: null,
  selectedItems: OrderedSet(),
  statusEffects: Set(),
});
