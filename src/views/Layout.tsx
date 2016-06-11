import * as React from 'react';
import Radium = require('radium');
import {connect} from 'react-redux';

import Inventory from './Inventory';
import Player from './Player';
import Editor from './Editor';
import Terminal from './Terminal';

import StatusEffect from '../components/StatusEffect';
import PanelContainer from '../components/PanelContainer';
import Panel from '../components/Panel';
import TabContainer from '../components/TabContainer';
import Tab from '../components/Tab';
import Icon from '../components/Icon';

import * as playerActions from '../actions/playerActions';
import * as layoutActions from '../actions/layoutActions';

interface ILayoutProps {
  activePlayerView: any,
  alert: any,
  footerHeight: any,
  resizePanel: any,
  setActiveView: any,
  sidebarHeight: any,
  sidebarWidth: any
}

export class Layout extends React.Component<ILayoutProps, {}> {
  render() {
    const {
      activePlayerView,
      alert,
      footerHeight,
      resizePanel,
      setActiveView,
      sidebarHeight,
      sidebarWidth
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

console.log(Radium);

export default connect((state) => ({
  alert: state.getIn(['ui', 'alert']),
  activePlayerView: state.getIn(['ui', 'activePlayerView']),
  footerHeight: state.getIn(['ui', 'footerHeight']),
  sidebarWidth: state.getIn(['ui', 'sidebarWidth']),
  sidebarHeight: state.getIn(['ui', 'sidebarHeight']),
}), {
  setActiveView: playerActions.setActiveView,
  resizePanel: layoutActions.resizePanel
})(Radium(Layout));

const styles = {
  alert: {
    backgroundColor: 'red',
    color: 'white',
    padding: 10,
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    zIndex: 1
  }
};
