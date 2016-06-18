import * as React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import Radium = require('radium');
import shallowCompare = require('react-addons-shallow-compare');

import StatusEffect from '../components/StatusEffect';

interface TerminalHistoryProps {
  history: List<string>;
}

export class TerminalHistory extends React.Component<TerminalHistoryProps, {}> {
  private container: any;

  public componentDidUpdate() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  public shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { history } = this.props;
    return (
      <div style={styles.container} ref={(container) => { this.container = container; } }>
        <ul style={styles.main}>
          {
            history.map((command, index) => {
              return <li key={index}><StatusEffect>{command}</StatusEffect></li>;
            })
          }
        </ul>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: '1 1 auto',
    overflowY: 'auto',
  },
  main: {
    padding: '4px 0 0 0',
  },
};

export default connect((state) => ({
  history: state.get('command').history,
}))(Radium(TerminalHistory));
