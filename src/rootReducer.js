import { combineReducers } from 'redux-immutable';
import inventoryIdsReducer from './reducers/inventory-ids-reducer';
import inventoryByIdReducer from './reducers/inventory-by-id-reducer';
import uiReducer from './reducers/ui-reducer';

export default combineReducers({
  inventoryIds: inventoryIdsReducer,
  inventoryById: inventoryByIdReducer,
  ui: uiReducer
});
