import {Record, Set, OrderedSet} from 'immutable';
import { EntityType } from './EntityRecord';

interface Ui {
  activeEditorView?: string;
  activePlayerView?: 'inventory' | 'player';
  alert?: string;
  editorViews?: OrderedSet<string>;
  footerHeight?: number;
  inventoryExpandedById?: Set<string>;
  player?: string;
  selectedItems?: OrderedSet<EntityType>;
  sidebarHeight?: number;
  sidebarWidth?: number;
  statusEffects?: Set<string>;
}

export type UiType = Ui & Record.Base;

export const UiRecord = Record({
  activeEditorView: '0',
  activePlayerView: 'inventory',
  alert: null,
  editorViews: OrderedSet(['0']),
  footerHeight: 300,
  inventoryExpandedById: Set([]),
  player: null,
  selectedItems: OrderedSet([]),
  sidebarHeight: 300,
  sidebarWidth: 300,
  statusEffects: Set([]),
});
