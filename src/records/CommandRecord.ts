import {List, Record} from 'immutable';
import { CommandPart } from './CommandPartRecord';

interface CommandProps {
  name: string;
  parts?: List<CommandPart>;
  path?: string;
}

export class Command extends Record<CommandProps>({
  name: '',
  parts: List([]),
  path: '',
}) implements CommandProps {
  public name: string;
  public parts: List<CommandPart>;
  public path: string;
};
