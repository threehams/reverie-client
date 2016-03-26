import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import Inventory from './Inventory';
import Editor from './Editor';
import DebuggerHistory from './DebuggerHistory';
import DebuggerPrompt from './DebuggerPrompt';

import TabContainer from '../components/TabContainer';
import Tab from '../components/Tab';
import * as inventoryActions from '../actions/inventory-actions';
import panelStyles from '../styles/panel';
import fontStyles from '../styles/font';
import EntityRecord from '../records/entity-record';

export class Layout extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    inventoryActions: React.PropTypes.object,
    player: React.PropTypes.instanceOf(EntityRecord),
    location: React.PropTypes.instanceOf(EntityRecord)
  };

  render() {
    const { player, location } = this.props;
    return (
      <div style={styles.container}>
        <aside style={styles.sidebar}>
          <div style={styles.sidebarSection}>
            <TabContainer>
              <Tab active>Inventory</Tab>
              <Tab>Character</Tab>
            </TabContainer>
            <Inventory containerId={player.id} ids={player.entities} {...inventoryActions} />
          </div>
          <div style={[styles.sidebarSection, { borderTop: panelStyles.border}]}>
            <TabContainer>
              <Tab active>
                Floor
              </Tab>
            </TabContainer>
            <Inventory containerId={location.id} ids={location.entities.filterNot(id => id === player.id)} {...inventoryActions} />
          </div>
        </aside>

        <section style={styles.main}>
          <section style={styles.editor}>
            { /* TODO elegant way of doing this? function for generating calc? */ }
            <Editor height={`calc(70vh - ${pagePadding}px - 30px)`} />
          </section>
          <section style={styles.debugger}>
            <div style={styles.debuggerHistory}>
              <DebuggerHistory />
            </div>
            <div style={styles.debuggerPrompt}>
              <DebuggerPrompt />
            </div>
          </section>
        </section>
      </div>
    );
  }
}

const pagePadding = 10;
const promptHeight = 30;
const styles = {
  container: {
    boxSizing: 'padding-box',
    height: '100vh',
    padding: pagePadding,
    width: '100vw'
  },
  sidebar: {
    boxSizing: 'padding-box',
    border: panelStyles.border,
    display: 'inline-block',
    height: `calc(100vh - ${pagePadding * 2}px)`,
    width: '25%',
    verticalAlign: 'top'
  },
  sidebarSection: {
    height: `calc(50vh - ${pagePadding}px)`
  },
  main: {
    boxSizing: 'padding-box',
    borderTop: panelStyles.border,
    borderRight: panelStyles.border,
    borderBottom: panelStyles.border,
    display: 'inline-block',
    width: '75%',
    verticalAlign: 'top',
    height: `calc(100vh - ${pagePadding * 2}px)`
  },
  editor: {
    boxSizing: 'padding-box',
    height: `calc(70vh - ${pagePadding}px)`
  },
  debugger: {
    borderTop: panelStyles.border,
    boxSizing: 'padding-box',
    height: `calc(30vh - ${pagePadding}px - 3px)`,
    ...fontStyles.monospace,
  },
  debuggerHistory: {
    boxSizing: 'padding-box',
    height: `calc(30vh - ${pagePadding}px - ${promptHeight}px - 1px)`
  },
  debuggerPrompt: {
    boxSizing: 'padding-box',
    height: promptHeight
  }
};

export default connect((state) => {
  const playerId = state.getIn(['ui', 'player']);
  const locationId = state.get('entities').find(entity => entity.entities.contains(playerId)).id;
  return {
    player: state.getIn(['entities', playerId]),
    location: state.getIn(['entities', locationId])
  };
}, inventoryActions)(Radium(Layout));
