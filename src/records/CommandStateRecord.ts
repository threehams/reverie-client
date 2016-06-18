import { List, Record, Set } from 'immutable';
import { AutocompleteItem, Command } from '../records';

interface CommandStateProps {
  autocompleteOpen?: boolean;
  autocompletePosition?: number;
  autocompleteSelectedItem?: AutocompleteItem;
  available?: Set<Command>;
  current?: string;
  cursorIndex?: number;
  history?: List<string>;
}

export class CommandState extends Record<CommandStateProps>({
  autocompleteOpen: false,
  autocompletePosition: null,
  autocompleteSelectedItem: null,
  available: Set([]),
  current: '',
  cursorIndex: 0,
  history: List([]),
}) implements CommandStateProps {
  public autocompleteOpen: boolean;
  public autocompletePosition: number;
  public autocompleteSelectedItem: AutocompleteItem;
  public available: Set<Command>;
  public current: string;
  public cursorIndex: number;
  public history: List<string>;
};
