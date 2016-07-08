import { Record, Set, OrderedSet } from 'immutable';

interface UiProps {
  activeEditorView?: string;
  activePlayerView?: 'inventory' | 'player';
  alert?: string;
  editorViews?: OrderedSet<string>;
  footerHeight?: number;
  inventoryExpandedById?: Set<string>;
  player?: string;
  selectedItems?: OrderedSet<string>;
  sidebarHeight?: number;
  sidebarWidth?: number;
  statusEffects?: Set<string>;
}

export class Ui extends Record<UiProps>({
  activeEditorView: '0',
  activePlayerView: 'inventory',
  alert: null,
  editorViews: OrderedSet(['0']),
  footerHeight: 300,
  inventoryExpandedById: Set([]),
  player: null,
  selectedItems: OrderedSet([]),
  sidebarHeight: 300,
  statusEffects: Set([]),
}) implements UiProps {
  public activeEditorView: string;
  public activePlayerView: 'inventory' | 'player';
  public alert: string;
  public editorViews: OrderedSet<string>;
  public footerHeight: number;
  public inventoryExpandedById: Set<string>;
  public player: string;
  public selectedItems: OrderedSet<string>;
  public sidebarHeight: number;
  public sidebarWidth: number;
  public statusEffects: Set<string>;
};
