import { combineReducers } from 'redux-immutable';

import commandHistoryReducer from './reducers/command-history-reducer';
import editorHistoryReducer from './reducers/editor-history-reducer';
import entitiesReducer from './reducers/entities-reducer';
import uiReducer from './reducers/ui-reducer';

export default combineReducers({
  editorHistory: editorHistoryReducer,
  commandHistory: commandHistoryReducer,
  entities: entitiesReducer,
  ui: uiReducer
});
