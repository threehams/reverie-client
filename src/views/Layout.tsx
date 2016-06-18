import * as React from 'react';
import Radium = require('radium');
import { connect } from 'react-redux';

import Inventory from './Inventory';
import Player from './Player';
import Editor from './Editor';
import { Terminal } from './Terminal';

import { Icon, PanelContainer, Panel, TabContainer, Tab } from '../components/';
import StatusEffect from '../components/StatusEffect';

import * as playerActions from '../actions/playerActions';
import * as layoutActions from '../actions/layoutActions';

interface LayoutProps {
  activePlayerView: any;
  alert: any;
  footerHeight: any;
  resizePanel: any;
  setActiveView: any;
  sidebarHeight: any;
  sidebarWidth: any;
}

@Radium
export class Layout extends React.Component<LayoutProps, {}> {
  public render() {
    const {
      activePlayerView,
      alert,
      footerHeight,
      resizePanel,
      setActiveView,
      sidebarHeight,
      sidebarWidth,
    } = this.props;

    return (
      <div>
        { alert && <div style={styles.alert}>{ alert }</div> }
        <PanelContainer footerHeight={footerHeight}
                        sidebarHeight={sidebarHeight}
                        sidebarWidth={sidebarWidth}
                        resizePanel={resizePanel}
        >
          <Panel type="sidebar" key="sidebar-upper">
            <TabContainer equalWidth>
              <Tab onClick={() => setActiveView('inventory') }
                   active={activePlayerView === 'inventory'}>
                <StatusEffect>
                  <Icon name="fa fa-folder-o" before />
                  <StatusEffect>Inventory</StatusEffect>
                </StatusEffect>
              </Tab>
              <Tab onClick={() => setActiveView('character') }
                   active={activePlayerView === 'character'}>
                <StatusEffect>
                  <Icon name="fa fa-user" before />
                  <StatusEffect>Character</StatusEffect>
                </StatusEffect>
              </Tab>
            </TabContainer>
            { activePlayerView === 'inventory' && <Inventory owner={'self'} /> }
            { activePlayerView === 'character' && <Player /> }
          </Panel>
          <Panel type="sidebar" key="sidebar-lower">
            <TabContainer>
              <Tab active>
                <StatusEffect>Floor</StatusEffect>
              </Tab>
            </TabContainer>
            <Inventory owner={'floor'} />
          </Panel>

          <Panel type="main" key="main">
            <Editor />
          </Panel>

          <Panel type="footer" key="footer">
            <Terminal />
          </Panel>
        </PanelContainer>
      </div>
    );
  }
}

export default connect((state) => ({
  activePlayerView: state.getIn(['ui', 'activePlayerView']),
  alert: state.getIn(['ui', 'alert']),
  footerHeight: state.getIn(['ui', 'footerHeight']),
  sidebarHeight: state.getIn(['ui', 'sidebarHeight']),
  sidebarWidth: state.getIn(['ui', 'sidebarWidth']),
}), {
  resizePanel: layoutActions.resizePanel,
  setActiveView: playerActions.setActiveView,
})(Layout);

const styles = {
  alert: {
    backgroundColor: 'red',
    color: 'white',
    padding: 10,
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    zIndex: 1,
  },
};
