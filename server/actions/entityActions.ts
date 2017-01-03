import { Dispatch } from 'redux';
import { EntityState, State } from '../records';

export interface MoveEntity {
  type: 'ENTITY_MOVE';
  payload: {
    id: string;
    parentId: string;
    destinationId: string;
  };
};

export const move = (from: string, to: string, entities: EntityState): MoveEntity => {
  return {
    payload: {
      destinationId: '3',
      id: '1',
      parentId: '2',
    },
    type: 'ENTITY_MOVE',
  };
};
