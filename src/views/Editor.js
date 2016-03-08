import React from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import Radium from 'radium';

import TabContainer from '../components/TabContainer';
import Tab from '../components/Tab';
import LoadingCircle from '../components/LoadingCircle';
import * as editorActions from '../actions/editor-actions';
import InventoryItemRecord from '../records/inventory-item-record';

export class Editor extends React.Component {
  static propTypes = {
    activeView: React.PropTypes.string,
    entityById: React.PropTypes.instanceOf(Map),
    log: React.PropTypes.instanceOf(List),
    setActiveView: React.PropTypes.func,
    tabs: React.PropTypes.instanceOf(List)
  };

  render() {
    const { activeView, entityById } = this.props;
    return (
      <div>
        <EditorTabs {...this.props} />
        { activeView ? <EditorDetail item={ entityById.get(activeView) } /> : <EditorMain {...this.props } /> }
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
    tabs: React.PropTypes.instanceOf(List)
  };

  render() {
    const { tabs, entityById, activeView, setActiveView, removeView } = this.props;
    return (
      <TabContainer>
        {
          tabs.map((tab, index) => {
            if (tab.type === 'main') {
              return (
                <Tab key={index} active={!activeView} onClick={ () => setActiveView(null) }>
                  main.js
                </Tab>
              );
            }
            const item = entityById.get(tab.id);
            return item ?
              <Tab key={tab.id}
                   active={tab.id === activeView}
                   onClick={ () => setActiveView(tab.id) }
                   onClickClose={ () => removeView(tab.id)}>
                {item.name}
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
    log: React.PropTypes.instanceOf(List)
  };

  render() {
    const { log } = this.props;
    return (
      <div>
        You are standing in an open field west of a white house, with a boarded front door.
        There is a small mailbox here.
      </div>
    );
  }
}

class EditorDetail extends React.Component {
  static propTypes = {
    item: React.PropTypes.instanceOf(InventoryItemRecord)
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
    tabs: state.getIn(['ui', 'editorTabs'])
  };
}, editorActions)(Radium(Editor));
