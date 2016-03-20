import React from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import Radium from 'radium';

import LoadingCircle from '../components/LoadingCircle';
import * as editorActions from '../actions/editor-actions';
import EntityRecord from '../records/entity-record';
import EditorTabs from './EditorTabs';

export class Editor extends React.Component {
  static propTypes = {
    activeView: React.PropTypes.string,
    editorHistory: React.PropTypes.instanceOf(List),
    entities: React.PropTypes.instanceOf(Map),
    log: React.PropTypes.instanceOf(List),
    setActiveView: React.PropTypes.func,
    views: React.PropTypes.instanceOf(List)
  };

  render() {
    const { activeView, entities, editorHistory } = this.props;
    return (
      <div>
        <EditorTabs {...this.props} />
        { activeView ? <EditorDetail item={ entities.get(activeView) } /> : <EditorMain history={editorHistory} /> }
      </div>
    );
  }
}

class EditorMain extends React.Component {
  static propTypes = {
    history: React.PropTypes.instanceOf(List)
  };

  render() {
    const { history } = this.props;
    return <ul style={styles.panel}>
      { history.map((item, index) => <li key={index}>{ item || '\u00a0' }</li>) }
    </ul>;
  }
}

class EditorDetail extends React.Component {
  static propTypes = {
    item: React.PropTypes.instanceOf(EntityRecord)
  };

  render() {
    const { item } = this.props;
    if (!item) return <LoadingCircle />;
    return (
      <div>
        <h1>{ item.name }</h1>
        <span>{ item.description }</span>
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

const styles = {
  panel: {
    padding: 10
  }
};
