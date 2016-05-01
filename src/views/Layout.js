import React, {PropTypes} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

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

export class Layout extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    activePlayerView: PropTypes.string,
    alert: PropTypes.string,
    footerHeight: PropTypes.number,
    setActiveView: PropTypes.func,
    sidebarHeight: PropTypes.number,
    sidebarWidth: PropTypes.number,
    resizePanel: PropTypes.func,
  };

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
                  <Icon name="folder-o" before />
                  <StatusEffect>Inventory</StatusEffect>
                </StatusEffect>
              </Tab>
              <Tab onClick={() => setActiveView('character') }
                   active={activePlayerView === 'character'}>
                <StatusEffect>
                  <Icon name="user" before />
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

export default connect((state) => {
  return {
    alert: state.getIn(['ui', 'alert']),
    activePlayerView: state.getIn(['ui', 'activePlayerView']),
    footerHeight: state.getIn(['ui', 'footerHeight']),
    sidebarWidth: state.getIn(['ui', 'sidebarWidth']),
    sidebarHeight: state.getIn(['ui', 'sidebarHeight']),
  };
}, {
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
