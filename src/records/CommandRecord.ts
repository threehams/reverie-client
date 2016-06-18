import {List, Record} from 'immutable';
import { CommandPartType } from './CommandPartRecord';

interface Command {
  name: string;
  parts?: List<CommandPartType>;
  path?: string;
}

export type CommandType = Command & Record.Base;

export const CommandRecord = Record<Command>({
  name: '',
  parts: List([]),
  path: '',
});
