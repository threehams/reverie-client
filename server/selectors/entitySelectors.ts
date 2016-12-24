import { createSelector } from 'reselect';
import { Entity, State } from '../records';
import { Map } from 'immutable';

type EntityDiffProps = Map<string, Entity>;

export const diff = createSelector(
  (state: State, props: State) => props.entities,
  (state: State) => state.entities,
  (prev, next) => {
    if (prev === next) {
      return prev.clear();
    }
    return next.filter((entity, id) => {
      return entity !== prev.get(id);
    });
  }
);
