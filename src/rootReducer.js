import { combineReducers } from 'redux-immutable';

import commandHistoryReducer from './reducers/command-history-reducer';
import inventoryIdsReducer from './reducers/inventory-ids-reducer';
import entityByIdReducer from './reducers/entity-by-id-reducer';
import uiReducer from './reducers/ui-reducer';

export default combineReducers({
  commandHistory: commandHistoryReducer,
  inventoryIds: inventoryIdsReducer,
  entityById: entityByIdReducer,
  ui: uiReducer
});
