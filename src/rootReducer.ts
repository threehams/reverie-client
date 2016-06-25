import commandReducer from './reducers/commandReducer';
import editorHistoryReducer from './reducers/editorHistoryReducer';
import entitiesReducer from './reducers/entitiesReducer';
import locationReducer from './reducers/locationReducer';
import uiReducer from './reducers/uiReducer';
import { State } from './records';
import { Action } from './actions/actionTypes';

const INITIAL_STATE: State = new State();

export const rootReducer = (state = INITIAL_STATE, action: Action): State => {
  return state.merge({
    command: commandReducer(state.command, action),
    editorHistory: editorHistoryReducer(state.editorHistory, action),
    entities: entitiesReducer(state.entities, action),
    location: locationReducer(state.location, action),
    ui: uiReducer(state.ui, action),
  });
};
