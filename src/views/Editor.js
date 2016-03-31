import React from 'react';
import { connect } from 'react-redux';
import { Map, List, OrderedSet } from 'immutable';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import * as editorActions from '../actions/editor-actions';
import EditorDetail from './EditorDetail';
import EditorMain from './EditorMain';
import EditorTabs from './EditorTabs';

import fontStyles from '../styles/font';

export class Editor extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    activeView: React.PropTypes.string,
    editorHistory: React.PropTypes.instanceOf(List),
    entities: React.PropTypes.instanceOf(Map),
    height: React.PropTypes.string,
    log: React.PropTypes.instanceOf(List),
    removeView: React.PropTypes.func,
    setActiveView: React.PropTypes.func,
    views: React.PropTypes.instanceOf(OrderedSet)
  };

  render() {
    const { activeView, editorHistory, entities, height, removeView, setActiveView, views} = this.props;
    const tabProps = {activeView, entities, setActiveView, removeView, views};
    return (
      <div style={fontStyles.monospace}>
        <EditorTabs {...tabProps} />
        {
          activeView !== '0' ?
            <EditorDetail item={ entities.get(activeView) } height={height} /> :
            <EditorMain history={editorHistory} height={height} />
        }
      </div>
    );
  }
}

export default connect((state) => {
  return {
    activeView: state.getIn(['ui', 'activeEditorView']),
    entities: state.get('entities'),
    editorHistory: state.get('editorHistory'),
    views: state.getIn(['ui', 'editorViews'])
  };
}, editorActions)(Radium(Editor));
