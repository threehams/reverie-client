import commandReducer from './reducers/commandReducer';
import editorHistoryReducer from './reducers/editorHistoryReducer';
import entitiesReducer from './reducers/entitiesReducer';
import locationReducer from './reducers/locationReducer';
import uiReducer from './reducers/uiReducer';
import { StateRecord, StateType } from './records/StateRecord';

const INITIAL_STATE: StateType = new StateRecord();

export const rootReducer = (state = INITIAL_STATE, action): StateType => {
  return state.merge({
    command: commandReducer(state.command, action),
    editorHistory: editorHistoryReducer(state.editorHistory, action),
    entities: entitiesReducer(state.entities, action),
    location: locationReducer(state.location, action),
    ui: uiReducer(state.ui, action),
  });
};
