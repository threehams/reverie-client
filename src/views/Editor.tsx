import * as React from 'react';
import { connect } from 'react-redux';
import { Map, List, OrderedSet } from 'immutable';
import Radium = require('radium');
import shallowCompare = require('react-addons-shallow-compare');

import * as editorActions from '../actions/editorActions';
import { EditorPanel } from './EditorPanel';
import EditorTabs from './EditorTabs';
import { EntityType } from '../records/EntityRecord';

import fontStyles from '../styles/font';

interface EditorProps {
  activeView: string;
  editorHistory: List<string>;
  entities: Map<string, EntityType>;
  log: List<string>;
  removeView: Function;
  setActiveView: Function;
  views: OrderedSet<string>;
}

export class Editor extends React.Component<EditorProps, {}> {
  public shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

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

export default connect((state) => ({
  activeView: state.getIn(['ui', 'activeEditorView']),
  editorHistory: state.get('editorHistory'),
  entities: state.get('entities'),
  views: state.getIn(['ui', 'editorViews']),
}), editorActions)(Radium(Editor));

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
