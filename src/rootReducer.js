import { combineReducers } from 'redux-immutable';
import inventoryIdsReducer from './reducers/inventory-ids-reducer';
import inventoryByIdReducer from './reducers/inventory-by-id-reducer';

export default combineReducers({
  inventoryIds: inventoryIdsReducer,
  inventoryById: inventoryByIdReducer
});
