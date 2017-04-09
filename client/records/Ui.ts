import { OrderedSet, Record, Set } from 'immutable';

interface UiProps {
  activeEditorView?: string;
  activePlayerView?: 'inventory' | 'character';
  alert?: string;
  editorViews?: OrderedSet<string>;
  footerHeight?: number;
  inventoryExpandedById?: Set<string>;
  selectedItems?: OrderedSet<string>;
  sidebarHeight?: number;
  sidebarWidth?: number;
  statusEffects?: Set<string>;
}

export class Ui extends Record<UiProps>({
  activeEditorView: '0',
  activePlayerView: 'inventory',
  alert: '',
  editorViews: OrderedSet(['0']),
  footerHeight: 300,
  inventoryExpandedById: Set([]),
  selectedItems: OrderedSet([]),
  sidebarHeight: 300,
  sidebarWidth: 250,
  statusEffects: Set([]),
}) implements UiProps {
  public activeEditorView: string;
  public activePlayerView: 'inventory' | 'character';
  public alert: string;
  public editorViews: OrderedSet<string>;
  public footerHeight: number;
  public inventoryExpandedById: Set<string>;
  public selectedItems: OrderedSet<string>;
  public sidebarHeight: number;
  public sidebarWidth: number;
  public statusEffects: Set<string>;
};
