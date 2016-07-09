import { Map, Record } from 'immutable';
import { Entity } from '../records';

interface StateProps {
  entities?: Map<string, Entity>;
}

export class State extends Record<StateProps>({
  entities: undefined,
}) implements StateProps {
  public entities: Map<string, Entity>;
};
