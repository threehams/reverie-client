import { Map } from 'immutable';
import { Dispatch } from 'redux';

import { MessageTarget, State } from '../records';
import { findIn, pathArray } from '../utils/findInPath';
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
    const state = getState();
    const locationId = state.entities.find(entity => entity.entities.includes(userId)).id;

    const item = findIn(pathArray(itemPath, userId, locationId), state.entities);
    const parent = findIn(pathArray(itemPath, userId, locationId).slice(0, -1), state.entities);
    const to = findIn(pathArray(toPath, userId, locationId), state.entities);
    if (!item || !parent || !to) {
      dispatch(setServerState({
        messages: Map({
          owner: `I couldn't find ${ !item ? itemPath : toPath }.`,
        }) as Map<MessageTarget, string>,
        owner: userId,
        timestamp: new Date().valueOf(),
      }));
      return;
    }

    dispatch(setServerState({
      entities: Map({
        [parent.id]: parent.set('entities', parent.entities.filter(entityId => entityId !== item.id)),
        [to.id]: to.update('entities', entities => entities.push(item.id)),
      }),
      messages: Map({
        owner: `You moved ${item.name} to ${to.name}.`,
        viewer: `${userId} moved ${item.name} to ${to.name}.`,
      }) as Map<MessageTarget, string>,
      observers: state.entities.get(locationId).entities.filter(entityId => {
        return entityId !== userId && state.entities.get(entityId).components.includes('player');
      }),
      owner: userId,
      timestamp: new Date().valueOf(),
    }));
  };
};
