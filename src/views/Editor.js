import React from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import Radium from 'radium';

import TabContainer from '../components/TabContainer';
import Tab from '../components/Tab';
import LoadingCircle from '../components/LoadingCircle';
import * as editorActions from '../actions/editor-actions';
import EntityRecord from '../records/entity-record';

export class Editor extends React.Component {
  static propTypes = {
    activeView: React.PropTypes.string,
    entityById: React.PropTypes.instanceOf(Map),
    log: React.PropTypes.instanceOf(List),
    setActiveView: React.PropTypes.func,
    views: React.PropTypes.instanceOf(List)
  };

  render() {
    const { activeView, locationId, entityById } = this.props;
    return (
      <div>
        <EditorTabs {...this.props} />
        { activeView ? <EditorDetail item={ entityById.get(activeView) } /> : <EditorMain /> }
      </div>
    );
  }
}

class EditorTabs extends React.Component {
  static propTypes = {
    activeView: React.PropTypes.string,
    entityById: React.PropTypes.instanceOf(Map),
    setActiveView: React.PropTypes.func,
    removeView: React.PropTypes.func,
    views: React.PropTypes.instanceOf(List)
  };

  render() {
    const { views, entityById, activeView, setActiveView, removeView } = this.props;
    return (
      <TabContainer>
        {
          views.map((view, index) => {
            const entity = entityById.get(view);
            if (index === 0) {
              return (
                <Tab key={index} active={!activeView} onClick={ () => setActiveView(null) }>
                  main.js
                </Tab>
              );
            }
            return entity ?
              <Tab key={view}
                   active={view === activeView}
                   onClick={ () => setActiveView(view) }
                   onClickClose={ () => removeView(view)}>
                {entity.name}
              </Tab> :
              <LoadingCircle key={index} />;
          })
        }
      </TabContainer>
    );
  }
}

class EditorMain extends React.Component {
  static propTypes = {
    location: React.PropTypes.instanceOf(EntityRecord)
  };

  render() {
    return (
      <div>
      </div>
    );
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
    entityById: state.get('entityById'),
    log: state.get('log'),
    views: state.getIn(['ui', 'editorViews'])
  };
}, editorActions)(Radium(Editor));
