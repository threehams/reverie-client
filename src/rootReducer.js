import { combineReducers } from 'redux-immutable';

import commandHistoryReducer from './reducers/commandHistoryReducer';
import editorHistoryReducer from './reducers/editorHistoryReducer';
import entitiesReducer from './reducers/entitiesReducer';
import uiReducer from './reducers/uiReducer';

export default combineReducers({
  editorHistory: editorHistoryReducer,
  commandHistory: commandHistoryReducer,
  entities: entitiesReducer,
  ui: uiReducer
});
