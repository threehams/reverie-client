import { combineReducers } from 'redux-immutable';

import commandHistoryReducer from './reducers/command-history-reducer';
import inventoryIdsReducer from './reducers/inventory-ids-reducer';
import inventoryByIdReducer from './reducers/inventory-by-id-reducer';
import uiReducer from './reducers/ui-reducer';

export default combineReducers({
  commandHistory: commandHistoryReducer,
  inventoryIds: inventoryIdsReducer,
  inventoryById: inventoryByIdReducer,
  ui: uiReducer
});
