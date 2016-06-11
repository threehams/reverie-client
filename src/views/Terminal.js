import React from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import TerminalHistory from './TerminalHistory';
import TerminalPrompt from './TerminalPrompt';

import fontStyles from '../styles/font';

export class Terminal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div style={styles.terminal}>
        <TerminalHistory />
        <div style={styles.terminalPrompt}>
          <TerminalPrompt />
        </div>
      </div>
    );
  }
}

export default Radium(Terminal);

const styles = {
  terminal: Object.assign(
    {
      display: 'flex',
      flexFlow: 'column nowrap',
      height: '100%',
    },
    fontStyles.monospace
  ),
  terminalPrompt: {
    flex: '0 0 30px',
    position: 'relative',
  }
};
