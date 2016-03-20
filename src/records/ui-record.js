import {Record, Map, Set} from 'immutable';

export default Record({
  inventoryExpandedById: Map(),
  currentCommand: '',
  editorViews: Set(['12', '7', '2']),
  activeEditorView: null,
  player: null
});
