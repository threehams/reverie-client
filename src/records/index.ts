import { Command } from './CommandRecord';
import { Entity } from './EntityRecord';
import { Exit } from './ExitRecord';

export type AutocompleteItem = Entity | Exit | Command;

export * from './AllowedRecord';
export * from './CommandPartRecord';
export * from './CommandRecord';
export * from './CommandStateRecord';
export * from './EntityRecord';
export * from './ExitRecord';
export * from './LocationRecord';
export * from './StateRecord';
export * from './UiRecord';
