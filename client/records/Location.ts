import { List, Record } from 'immutable';

interface LocationProps {
  description?: string;
  entities?: List<string>;
  exits?: List<string>;
  name?: string;
}

export class Location extends Record<LocationProps>({
  description: '',
  entities: List([]),
  exits: List([]),
  name: '',
}) implements LocationProps {
  public description: string;
  public entities: List<string>;
  public exits: List<string>;
  public name: string;
};
