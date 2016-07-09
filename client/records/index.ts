import { Command, Entity } from '../../common/records';
import { Exit } from './Exit';

export * from './CommandState';
export { Allowed, Command, CommandPart, Entity, Location } from '../../common/records';
export * from './Exit';
export * from './State';
export * from './Ui';

export type AutocompleteItem = Entity | Exit | Command;
