import React from 'react';
import Radium from 'radium';

import Inventory from './Inventory';
import Editor from './Editor';
import DebuggerHistory from './DebuggerHistory';
import DebuggerPrompt from './DebuggerPrompt';
import panelStyles from '../styles/panel';

import TabContainer from '../components/TabContainer';
import Tab from '../components/Tab';

export class Layout extends React.Component {
  static propTypes = {

  };

  render() {
    return (
      <div style={styles.container}>
        <aside style={[panelStyles, styles.sidebar]}>
          <TabContainer>
            <Tab active>
              Inventory
            </Tab>
          </TabContainer>
          <Inventory />
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
    flex: '1 1 20%'
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

export default Radium(Layout);
