import { Action } from 'redux-actions';
import { State } from './records';
import {commandReducer} from './reducers/commandReducer';
import {editorHistoryReducer} from './reducers/editorHistoryReducer';
import {entitiesReducer} from './reducers/entitiesReducer';
import {locationReducer} from './reducers/locationReducer';
import {uiReducer} from './reducers/uiReducer';

const INITIAL_STATE: State = new State();

export const rootReducer = (state = INITIAL_STATE, action: Action<any>): State => {
  return state.merge({
    command: commandReducer(state.command, <any> action),
    editorHistory: editorHistoryReducer(state.editorHistory, <any> action),
    entities: entitiesReducer(state.entities, <any> action),
    location: locationReducer(state.location, <any> action),
    ui: uiReducer(state.ui, <any> action),
  });
};
