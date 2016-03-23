import {Record, Map, OrderedSet} from 'immutable';

export default Record({
  inventoryExpandedById: Map(),
  currentCommand: '',
  editorViews: OrderedSet(['0']),
  activeEditorView: null,
  player: null
});
