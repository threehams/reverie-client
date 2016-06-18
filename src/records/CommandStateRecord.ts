import { List, Record, Set } from 'immutable';
import { EntityType } from './EntityRecord';
import { CommandType } from './CommandRecord';
import { ExitType } from './ExitRecord';

interface CommandState {
  autocompleteOpen?: boolean;
  autocompletePosition?: number;
  autocompleteSelectedItem?: EntityType|CommandType|ExitType;
  available?: Set<string>;
  current?: string;
  cursorIndex?: number;
  history?: List<string>;
}

export type CommandStateType = CommandState & Record.Base;

export const CommandStateRecord = Record<CommandState>({
  autocompleteOpen: false,
  autocompletePosition: null,
  autocompleteSelectedItem: null,
  available: Set([]),
  current: '',
  cursorIndex: 0,
  history: List([]),
});
