import {Record, Map, List} from 'immutable';
import EditorTabRecord from '../records/editor-tab-record';

export default Record({
  inventoryExpandedById: Map(),
  currentCommand: '',
  editorTabs: List([
    new EditorTabRecord({
      type: 'main'
    }),
    new EditorTabRecord({
      type: 'detail',
      id: '1'
    }),
    new EditorTabRecord({
      type: 'detail',
      id: '2'
    })
  ]),
  activeEditorView: null
});
