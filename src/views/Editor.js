import React from 'react';
import { connect } from 'react-redux';
import { Map, List, OrderedSet } from 'immutable';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import LoadingCircle from '../components/LoadingCircle';
import * as editorActions from '../actions/editor-actions';
import EntityRecord from '../records/entity-record';
import EditorTabs from './EditorTabs';

import panelStyles from '../styles/panel';
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
    setActiveView: React.PropTypes.func,
    views: React.PropTypes.instanceOf(OrderedSet)
  };

  render() {
    const { activeView, entities, editorHistory, height } = this.props;
    return (
      <div style={fontStyles.monospace}>
        <EditorTabs {...this.props} />
        {
          activeView !== '0' ?
            <EditorDetailRadium item={ entities.get(activeView) } height={height} /> :
            <EditorMainRadium history={editorHistory} height={height} />
        }
      </div>
    );
  }
}

class EditorMain extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    history: React.PropTypes.instanceOf(List),
    height: React.PropTypes.string
  };

  render() {
    const { height, history } = this.props;
    return (
      <div style={{position: 'relative', paddingLeft: Math.ceil(history.size / 10) * 14 + 20, backgroundColor: '#f0f0f0', height }}>
        <ul style={{position: 'absolute', left: 4, height, textAlign: 'right'}}>
          { history.map((item, index) => <li key={index} style={{color: '#800000'}}>{index}</li>) }
        </ul>
        <ul style={{backgroundColor: 'white', borderLeft: '1px solid #d0d0d0', paddingLeft: 4, height}}>
          { history.map((item, index) => <li key={index}>{ item || '\u00a0' }</li>) }
        </ul>
      </div>
    );
  }
}

const EditorMainRadium = Radium(EditorMain);

class EditorDetail extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    item: React.PropTypes.instanceOf(EntityRecord),
    height: React.PropTypes.string
  };

  render() {
    const { height, item } = this.props;
    if (!item) return <LoadingCircle />;
    return (
      <div style={{ padding: panelStyles.padding, height }}>
        <h1>{ item.name }</h1>
        <span>{ item.description }</span>
      </div>
    );
  }
}

const EditorDetailRadium = Radium(EditorDetail);

export default connect((state) => {
  return {
    activeView: state.getIn(['ui', 'activeEditorView']),
    entities: state.get('entities'),
    editorHistory: state.get('editorHistory'),
    views: state.getIn(['ui', 'editorViews'])
  };
}, editorActions)(Radium(Editor));
