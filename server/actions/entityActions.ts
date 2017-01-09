import { Map } from 'immutable';
import { Dispatch } from 'redux';

import { MessageTarget, State } from '../records';
import { setServerState, SetServerState } from './messageActions';

export interface MoveEntity {
  type: 'ENTITY_MOVE';
  payload: {
    id: string;
    parentId: string;
    destinationId: string;
  };
};

// 'from' and 'to' are both string names with or without paths, not ids!
export const move = (userId: string, itemPath: string, toPath: string) => {
  return (dispatch: Dispatch<SetServerState>, getState: () => State) => {
    function pathToSelector(path: string) {
      return ('entityByName/' + path.replace(/^self/, userId).replace(/^floor/, locationId) + '/id').split('/');
    }

    const state = getState();
    const locationId = state.entities.find(entity => entity.entities.includes(userId)).id;
    const itemId = state.getIn(pathToSelector(itemPath)) as string;
    const parentId = state.getIn(pathToSelector(itemPath.split('/').slice(0, -1).join('/'))) as string;
    const toId = state.getIn(pathToSelector(toPath)) as string;
    const parent = state.entities.get(parentId);
    const to = state.entities.get(toId);

    dispatch(setServerState({
      entities: Map({
        [parentId]: parent.set('entities', parent.entities.filter(entityId => entityId !== itemId)),
        [toId]: to.update('entities', entities => entities.push(itemId)),
      }),
      messages: Map({
        owner: `You moved ${itemPath} to ${toPath}.`,
        viewer: `${userId} moved ${itemPath} to ${toPath}.`,
      }) as Map<MessageTarget, string>,
      observers: state.entities.get(locationId).entities.filter(entityId => {
        return entityId !== userId && state.entities.get(entityId).components.includes('player');
      }),
      owner: userId,
      timestamp: new Date().valueOf(),
    }));
  };
};
