import { combineReducers } from 'redux-immutable';

import commandHistoryReducer from './reducers/commandHistoryReducer';
import editorHistoryReducer from './reducers/editorHistoryReducer';
import entitiesReducer from './reducers/entitiesReducer';
import locationReducer from './reducers/locationReducer';
import uiReducer from './reducers/uiReducer';

export default combineReducers({
  editorHistory: editorHistoryReducer,
  commandHistory: commandHistoryReducer,
  entities: entitiesReducer,
  location: locationReducer,
  ui: uiReducer
});
