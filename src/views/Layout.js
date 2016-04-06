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


export class Layout extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    inventoryActions: PropTypes.object,
    playerId: PropTypes.string,
    locationId: PropTypes.string,
    alert: PropTypes.string
  };

  render() {
    const { playerId, locationId, alert } = this.props;
    if (!playerId || !locationId) {
      return <LoadingCircle />;
    }
    return (
      <div>
        { alert && <div style={styles.alert}>{ alert }</div> }
        <div style={styles.container}>
          <aside style={styles.sidebar}>
            <div style={styles.sidebarSection}>
              <TabContainer>
                <Tab active>Inventory</Tab>
                <Tab>Player</Tab>
              </TabContainer>
              <Inventory id={playerId} {...inventoryActions} />
            </div>
            <div style={[styles.sidebarSection, { borderTop: panelStyles.border}]}>
              <TabContainer>
                <Tab active>
                  Floor
                </Tab>
              </TabContainer>
              <Inventory id={locationId} {...inventoryActions} />
            </div>
          </aside>

          <main style={styles.main}>
            <section style={styles.editor}>
              <Editor height={`calc(70vh - ${pagePadding}px - 24px)`} />
            </section>
            <section style={styles.debugger}>
              <div style={styles.debuggerHistory}>
                <DebuggerHistory />
              </div>
              <div style={styles.debuggerPrompt}>
                <DebuggerPrompt />
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    playerId: state.getIn(['ui', 'player']),
    locationId: state.getIn(['ui', 'location']),
    alert: state.getIn(['ui', 'alert']),
    activePlayerTab: state.getIn(['ui', 'activePlayerTab'])
  };
}, inventoryActions)(Radium(Layout));

const pagePadding = 10;
const promptHeight = 30;
const styles = {
  container: {
    padding: pagePadding,
  },
  alert: {
    backgroundColor: 'red',
    color: 'white',
    padding: 10,
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    zIndex: 1
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
