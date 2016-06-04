import React from 'react';
import { connect } from 'react-redux';
import { Map, List, OrderedSet } from 'immutable';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import * as editorActions from '../actions/editorActions';
import EditorPanel from './EditorPanel';
import EditorTabs from './EditorTabs';

import fontStyles from '../styles/font';

export class Editor extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    activeView: React.PropTypes.string,
    editorHistory: React.PropTypes.instanceOf(List),
    entities: React.PropTypes.instanceOf(Map),
    log: React.PropTypes.instanceOf(List),
    removeView: React.PropTypes.func,
    setActiveView: React.PropTypes.func,
    views: React.PropTypes.instanceOf(OrderedSet)
  };

  createHistory(item) {
    return List([
      `# ${item.name}`,
      '',
      ...item.description.split('\n')
    ]);
  }

  render() {
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
}

export default connect((state) => ({
  activeView: state.getIn(['ui', 'activeEditorView']),
  entities: state.get('entities'),
  editorHistory: state.get('editorHistory'),
  views: state.getIn(['ui', 'editorViews'])
}), editorActions)(Radium(Editor));

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    height: '100%',
    ...fontStyles.monospace
  }
};
