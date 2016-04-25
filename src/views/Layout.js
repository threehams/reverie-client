import React, {PropTypes} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import { List } from 'immutable';

import Inventory from './Inventory';
import Player from './Player';
import Editor from './Editor';
import DebuggerHistory from './DebuggerHistory';
import DebuggerPrompt from './DebuggerPrompt';
import Loader from '../components/Loader';
import EntityRecord from '../records/EntityRecord';
import LocationRecord from '../records/LocationRecord';
import StatusEffect from '../components/StatusEffect';

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
    const { activePlayerView, player, setActiveView, alert } = this.props;
    if (!player) {
      return <Loader />;
    }

    return (
      <div>
        { alert && <div style={styles.alert}>{ alert }</div> }
        <aside style={styles.sidebar}>
          <div style={styles.sidebarSection}>
            <TabContainer equalWidth>
              <Tab onClick={() => setActiveView('inventory') }
                   active={activePlayerView === 'inventory'}>
                <StatusEffect><Icon name="folder-o" before /> <StatusEffect>Inventory</StatusEffect></StatusEffect>
              </Tab>
              <Tab onClick={() => setActiveView('character') }
                   active={activePlayerView === 'character'}>
                <StatusEffect><Icon name="user" before /> <StatusEffect>Character</StatusEffect></StatusEffect>
              </Tab>
            </TabContainer>
            { activePlayerView === 'inventory' && <Inventory owner={'self'} /> }
            { activePlayerView === 'character' && <Player player={player} /> }
          </div>
          <div style={[styles.sidebarSection, { borderTop: panelStyles.border}]}>
            <TabContainer>
              <Tab active>
                <StatusEffect>Floor</StatusEffect>
              </Tab>
            </TabContainer>
            <Inventory owner={'floor'} />
          </div>
        </aside>

        <main style={styles.main}>
          <section style={styles.editor}>
            <Editor height={'calc(80vh - 24px)'} />
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
    );
  }
}

export default connect((state) => {
  return {
    player: state.getIn(['entities', state.getIn(['ui', 'player'])]),
    location: state.get('location'),
    alert: state.getIn(['ui', 'alert']),
    activePlayerView: state.getIn(['ui', 'activePlayerView']),
  };
}, {
  setActiveView: playerActions.setActiveView
})(Radium(Layout));

const promptHeight = 30;
const styles = {
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
    height: '80vh',
    width: '25%',
    verticalAlign: 'top'
  },
  sidebarSection: {
    height: '40vh'
  },
  main: {
    borderBottom: panelStyles.border,
    display: 'inline-block',
    width: '75%',
    verticalAlign: 'top',
    height: '80vh'
  },
  editor: {
    height: '80vh'
  },
  footer: {
    backgroundColor: panelStyles.backgroundColor,
    height: 'calc(20vh - 2px)'
  },
  debugger: {
    borderTop: panelStyles.border,
    ...fontStyles.monospace,
    position: 'relative'
  },
  debuggerHistory: {
    height: `calc(20vh - ${promptHeight}px - 1px)`
  },
  debuggerPrompt: {
    height: promptHeight
  }
};
