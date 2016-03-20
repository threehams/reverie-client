import React from 'react';
import Radium from 'radium';
import { List } from 'immutable';
import {connect} from 'react-redux';

import Inventory from './Inventory';
import Editor from './Editor';
import DebuggerHistory from './DebuggerHistory';
import DebuggerPrompt from './DebuggerPrompt';
import panelStyles from '../styles/panel';

import TabContainer from '../components/TabContainer';
import Tab from '../components/Tab';
import * as inventoryActions from '../actions/inventory-actions';

export class Layout extends React.Component {
  static propTypes = {
    inventoryActions: React.PropTypes.object,
    playerInventoryIds: React.PropTypes.instanceOf(List),
    locationInventoryIds: React.PropTypes.instanceOf(List)
  };

  render() {
    const { playerInventoryIds, locationInventoryIds } = this.props;
    return (
      <div style={styles.container}>
        <aside style={[panelStyles, styles.sidebar]}>
          <div style={styles.sidebarSection}>
            <TabContainer>
              <Tab active>Inventory</Tab>
              <Tab>Character</Tab>
            </TabContainer>
            <Inventory ids={playerInventoryIds} {...inventoryActions} />
          </div>
          <div style={styles.sidebarSection}>
            <TabContainer>
              <Tab active>
                Floor
              </Tab>
            </TabContainer>
            <Inventory ids={locationInventoryIds} {...inventoryActions} />
          </div>
        </aside>

        <section style={styles.main}>
          <section style={[panelStyles, styles.editor]}>
            <Editor />
          </section>
          <section style={[panelStyles, styles.debugger]}>
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

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'row nowrap',
    height: '100vh',
    padding: 20,
    width: '100vw'
  },
  sidebar: {
    display: 'flex',
    flexFlow: 'column nowrap',
    flex: '1 1 20%'
  },
  sidebarSection: {
    flex: '1 1 50%'
  },
  main: {
    flex: '1 1 80%',
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  inventory: {
    flex: '1 1 20%'
  },
  editor: {
    flex: '1 1 80%'
  },
  debugger: {
    flex: '1 1 20%',
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  debuggerHistory: {
    flex: '1 1 auto'
  },
  debuggerPrompt: {
    flex: '0 0 30px'
  }
};

export default connect((state) => {
  const playerId = state.getIn(['ui', 'player']);
  const locationId = state.get('entities').find(entity => entity.entities.contains(playerId)).id;
  console.log(locationId);
  return {
    playerInventoryIds: state.getIn(['entities', playerId, 'entities']),
    locationInventoryIds: state.getIn(['entities', locationId, 'entities']).filter(id => playerId !== id)
  };
}, inventoryActions)(Radium(Layout));
