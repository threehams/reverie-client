import { List, Record } from 'immutable';
import { Command } from '../records';

interface CommandStateProps {
  available?: List<Command>;
}

export class CommandState extends Record<CommandStateProps>({
  available: undefined,
}) implements CommandStateProps {
  public available: List<Command>;
};
