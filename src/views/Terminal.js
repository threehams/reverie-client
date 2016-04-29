import React from 'react';
import Radium from 'radium';

import TerminalHistory from './TerminalHistory';
import TerminalPrompt from './TerminalPrompt';

import fontStyles from '../styles/font';

export class Terminal extends React.Component {
  render() {
    return (
      <div style={styles.terminal}>
        <div style={styles.terminalHistory}>
          <TerminalHistory />
        </div>
        <div style={styles.terminalPrompt}>
          <TerminalPrompt />
        </div>
      </div>
    );
  }
}

export default Radium(Terminal);

const styles = {
  terminal: {
    display: 'flex',
    flexFlow: 'column nowrap',
    height: '100%',
    ...fontStyles.monospace,
  },
  terminalHistory: {
    flex: '1 1 auto'
  },
  terminalPrompt: {
    flex: '0 0 30px'
  }
};
