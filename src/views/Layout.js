import React, {PropTypes} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import Inventory from './Inventory';
import Editor from './Editor';
import DebuggerHistory from './DebuggerHistory';
import DebuggerPrompt from './DebuggerPrompt';
import LoadingCircle from '../components/LoadingCircle';

import TabContainer from '../components/TabContainer';
import Tab from '../components/Tab';
import * as inventoryActions from '../actions/inventoryActions';
import panelStyles from '../styles/panel';
import fontStyles from '../styles/font';
import EntityRecord from '../records/entityRecord';


export class Layout extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    inventoryActions: PropTypes.object,
    player: PropTypes.instanceOf(EntityRecord),
    location: PropTypes.instanceOf(EntityRecord),
    alert: PropTypes.string
  };

  render() {
    const { player, location, alert, } = this.props;
    if (!player || !location) {
      return <LoadingCircle />;
    }
    return (
      <div style={styles.container}>
        { alert && <div style={styles.alert}>{ alert }</div> }
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
    padding: pagePadding,
  },
  alert: {
    backgroundColor: 'red',
    color: 'white',
    width: '100%'
  },
  sidebar: {
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
    borderTop: panelStyles.border,
    borderRight: panelStyles.border,
    borderBottom: panelStyles.border,
    display: 'inline-block',
    width: '75%',
    verticalAlign: 'top',
    height: `calc(100vh - ${pagePadding * 2}px)`
  },
  editor: {
    height: `calc(70vh - ${pagePadding}px)`
  },
  debugger: {
    borderTop: panelStyles.border,
    height: `calc(30vh - ${pagePadding}px - 3px)`,
    ...fontStyles.monospace,
    position: 'relative'
  },
  debuggerHistory: {
    height: `calc(30vh - ${pagePadding}px - ${promptHeight}px - 1px)`
  },
  debuggerPrompt: {
    height: promptHeight
  }
};

export default connect((state) => {
  const playerId = state.getIn(['ui', 'player']);
  const location = state.get('entities').find(entity => entity.entities.contains(playerId));
  const locationId = location && location.id;
  return {
    player: state.getIn(['entities', playerId]),
    location: state.getIn(['entities', locationId]),
    alert: state.getIn(['ui', 'alert'])
  };
}, inventoryActions)(Radium(Layout));
