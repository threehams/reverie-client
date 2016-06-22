import * as React from 'react';
import { connect } from 'react-redux';
import { Map, List, OrderedSet } from 'immutable';
import Radium = require('radium');

import * as editorActions from '../actions/editorActions';
import { EditorPanel } from './EditorPanel';
import EditorTabs from './EditorTabs';
import { Entity, State } from '../records';

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

@Radium
export class Editor extends React.Component<EditorProps, {}> {
  public render() {
    const { activeView, editorHistory, entities, removeView, setActiveView, views} = this.props;
    const tabProps = {activeView, entities, setActiveView, removeView, views};
    return (
      <div style={styles.container}>
        <EditorTabs {...tabProps} />
        {
          activeView !== '0' ?
            <EditorPanel history={this.createHistory(entities.get(activeView))} /> :
            <EditorPanel history={editorHistory} />
        }
      </div>
    );
  }

  private createHistory(item) {
    return List([
      `# ${item.name}`,
      '',
      ...item.description.split('\n'),
    ]);
  }
}

export default connect((state: State) => ({
  activeView: state.ui.activeEditorView,
  editorHistory: state.editorHistory,
  entities: state.entities,
  views: state.ui.editorViews,
}), editorActions)(Editor);

const styles = {
  container: Object.assign(
    {
      display: 'flex',
      flexFlow: 'column nowrap',
      height: '100%',
    },
    fontStyles.monospace
  ),
};
