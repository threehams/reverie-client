import { List, Record } from 'immutable';

interface Location {
  description?: string;
  entities?: List<string>;
  exits?: List<string>;
  name?: string;
}

export type LocationType = Location & Record.Base;

export const LocationRecord = Record<Location>({
  description: '',
  entities: List([]),
  exits: List([]),
  name: '',
});
