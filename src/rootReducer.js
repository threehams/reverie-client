import { combineReducers } from 'redux-immutable';

import commandReducer from './reducers/commandReducer';
import editorHistoryReducer from './reducers/editorHistoryReducer';
import entitiesReducer from './reducers/entitiesReducer';
import locationReducer from './reducers/locationReducer';
import uiReducer from './reducers/uiReducer';

export default combineReducers({
  editorHistory: editorHistoryReducer,
  command: commandReducer,
  entities: entitiesReducer,
  location: locationReducer,
  ui: uiReducer
});
