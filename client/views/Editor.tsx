import { List, Map, OrderedSet } from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import Radium = require('radium');

import * as editorActions from '../actions/editorActions';
import { Entity, State } from '../records';
import { EditorPanel } from './EditorPanel';
import { EditorTabs } from './EditorTabs';

import fontStyles from '../styles/font';

interface EditorProps {
  activeView: string;
  editorHistory: List<string>;
  entities: Map<string, Entity>;
  log: List<string>;
  removeView: Function;
  setActiveView: Function;
  views: OrderedSet<string>;
}

function createHistory(item: Entity) {
  return List([
    `# ${item.name}`,
    '',
    ...item.description.split('\n'),
  ]);
}

const EditorBase: React.StatelessComponent<EditorProps> = ({
  activeView,
  editorHistory,
  entities,
  removeView,
  setActiveView,
  views,
}) => {
  const tabProps = { activeView, entities, setActiveView, removeView, views };
  return <div style={styles.container}>
    <EditorTabs {...tabProps} />
    {
      activeView !== '0' ?
        <EditorPanel history={createHistory(entities.get(activeView))} /> :
        <EditorPanel history={editorHistory} />
    }
  </div>;
};

export const Editor = connect((state: State) => ({
  activeView: state.ui.activeEditorView,
  editorHistory: state.editorHistory,
  entities: state.entities,
  views: state.ui.editorViews,
}), {
  removeView: editorActions.removeView,
  setActiveView: editorActions.setActiveView,
})(Radium(EditorBase));

const styles = {
  container: Object.assign(
    {
      display: 'flex',
      flexFlow: 'column nowrap',
      height: '100%',
    },
    fontStyles.monospace,
  ),
};
