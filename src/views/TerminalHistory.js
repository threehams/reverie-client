import React from 'react';
import { connect } from 'react-redux';
import {List} from 'immutable';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import StatusEffect from '../components/StatusEffect';

export class TerminalHistory extends React.Component {
  componentDidUpdate() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    history: React.PropTypes.instanceOf(List)
  };

  render() {
    const { history } = this.props;
    return (
      <div style={styles.container} ref={(container) => { this.container = container; } }>
        <ul style={styles.main}>
          {
            history.map((command, index) => {
              return <li style={styles.item} key={index}><StatusEffect>{command}</StatusEffect></li>;
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
  }
};

export default connect((state) => {
  return {
    history: state.get('command').history
  };
})(Radium(TerminalHistory));

