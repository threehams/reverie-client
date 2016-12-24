export interface MoveEntity {
  type: 'ENTITY_MOVE';
  payload: {
    id: string;
    to: string;
  };
};

export const move = (id: string, to: string): MoveEntity => ({
  payload: {
    id,
    to,
  },
  type: 'ENTITY_MOVE',
});
