import * as React from 'react';
import Radium = require('radium');
import shallowCompare = require('react-addons-shallow-compare');

import TerminalHistory from './TerminalHistory';
import {TerminalPrompt} from './TerminalPrompt';

import fontStyles from '../styles/font';

@Radium
export class Terminal extends React.Component<{}, {}> {
  public shouldComponentUpdate(nextProps: {}, nextState: {}) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
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

const styles = {
  terminal: Object.assign(
    {
      display: 'flex',
      flexFlow: 'column nowrap',
      height: '100%',
    },
    fontStyles.monospace,
  ),
  terminalPrompt: {
    flex: '0 0 30px',
    position: 'relative',
  },
};
