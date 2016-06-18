import { List, Record } from 'immutable';
import { Allowed } from './AllowedRecord';

interface CommandPartProps {
  allowed?: List<Allowed>;
}

export class CommandPart extends Record<CommandPartProps>({
  allowed: List([]),
}) implements CommandPartProps {
  public allowed: List<Allowed>;
};
