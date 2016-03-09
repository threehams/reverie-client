import {Record, Map, List} from 'immutable';

export default Record({
  inventoryExpandedById: Map(),
  currentCommand: '',
  editorViews: List(['12', '1', '2']),
  activeEditorView: null,
  player: null
});
