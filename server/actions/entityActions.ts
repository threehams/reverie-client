import { Dispatch } from 'redux';
import { EntityState, State } from '../records';
import { setState, SetState } from './messageActions';

export interface MoveEntity {
  type: 'ENTITY_MOVE';
  payload: {
    id: string;
    parentId: string;
    destinationId: string;
  };
};

// 'from' and 'to' are both string names with or without paths, not ids!
export const move = (userId: string, fromPath: string, toPath: string, entities: EntityState) => {
  return (dispatch: Dispatch<SetState>, getState: () => State) => {
    function pathToSelector(path: string) {
      return ('entities/' + path.replace(/^self/, userId).replace(/^floor/, locationId) + '/id').split('/');
    }

    const locationId = entities.find(entity => entity.entities.includes(userId)).id;
    const state = getState();
    const from = state.getIn(pathToSelector(fromPath));
    const to = state.getIn(pathToSelector(toPath));
  };
};
