import {List, Record} from 'immutable';
import { AllowedType } from './AllowedRecord';

interface CommandPart {
  allowed?: List<AllowedType>;
  name: string;
}

export type CommandPartType = CommandPart & Record.Base;

export const CommandPartRecord = Record<CommandPart>({
  allowed: List([]),
  name: '',
});
