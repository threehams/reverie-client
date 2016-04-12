import React, {PropTypes} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import Inventory from './Inventory';
import Player from './Player';
import Editor from './Editor';
import DebuggerHistory from './DebuggerHistory';
import DebuggerPrompt from './DebuggerPrompt';
import Loader from '../components/Loader';
import EntityRecord from '../records/entityRecord';
import LocationRecord from '../records/locationRecord';

import TabContainer from '../components/TabContainer';
import Tab from '../components/Tab';
import Icon from '../components/Icon';
import * as playerActions from '../actions/playerActions';
import panelStyles from '../styles/panel';
import fontStyles from '../styles/font';

export class Layout extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    activePlayerView: PropTypes.string,
    alert: PropTypes.string,
    location: PropTypes.instanceOf(LocationRecord),
    player: PropTypes.instanceOf(EntityRecord),
    setActiveView: PropTypes.func
  };

  render() {
    const { activePlayerView, player, location, setActiveView, alert } = this.props;
    if (!player || !location) {
      return <Loader />;
    }

    return (
      <div>
        { alert && <div style={styles.alert}>{ alert }</div> }
        <div style={styles.container}>
          <aside style={styles.sidebar}>
            <div style={styles.sidebarSection}>
              <TabContainer equalWidth>
                <Tab onClick={() => setActiveView('inventory') }
                     active={activePlayerView === 'inventory'}>
                  <Icon name="folder-o" before /> Inventory
                </Tab>
                <Tab onClick={() => setActiveView('character') }
                     active={activePlayerView === 'character'}>
                  <Icon name="user" before /> Character
                </Tab>
              </TabContainer>
              { activePlayerView === 'inventory' && <Inventory ids={player.entities} /> }
              { activePlayerView === 'character' && <Player player={player} /> }
            </div>
            <div style={[styles.sidebarSection, { borderTop: panelStyles.border}]}>
              <TabContainer>
                <Tab active>
                  Floor
                </Tab>
              </TabContainer>
              <Inventory ids={location.entities} />
            </div>
          </aside>

          <main style={styles.main}>
            <section style={styles.editor}>
              <Editor height={`calc(80vh - ${pagePadding}px - 24px)`} />
            </section>
          </main>

          <footer style={styles.footer}>
            <section style={styles.debugger}>
              <div style={styles.debuggerHistory}>
                <DebuggerHistory />
              </div>
              <div style={styles.debuggerPrompt}>
                <DebuggerPrompt />
              </div>
            </section>
          </footer>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    player: state.getIn(['entities', state.getIn(['ui', 'player'])]),
    location: state.get('location'),
    alert: state.getIn(['ui', 'alert']),
    activePlayerView: state.getIn(['ui', 'activePlayerView'])
  };
}, {
  setActiveView: playerActions.setActiveView
})(Radium(Layout));

const pagePadding = 0;
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
    backgroundColor: panelStyles.backgroundColor,
    borderRight: panelStyles.border,
    display: 'inline-block',
    height: `calc(80vh - ${pagePadding}px)`,
    width: '25%',
    verticalAlign: 'top'
  },
  sidebarSection: {
    height: `calc(40vh - ${pagePadding}px)`
  },
  main: {
    borderBottom: panelStyles.border,
    display: 'inline-block',
    width: '75%',
    verticalAlign: 'top',
    height: `calc(80vh - ${pagePadding}px)`
  },
  editor: {
    height: `calc(80vh - ${pagePadding}px)`
  },
  footer: {
    backgroundColor: panelStyles.backgroundColor,
    height: `calc(20vh - ${pagePadding}px - 2px)`
  },
  debugger: {
    borderTop: panelStyles.border,
    ...fontStyles.monospace,
    position: 'relative'
  },
  debuggerHistory: {
    height: `calc(20vh - ${pagePadding}px - ${promptHeight}px - 1px)`
  },
  debuggerPrompt: {
    height: promptHeight
  }
};
