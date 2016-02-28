import React from 'react';
import { connect } from 'react-redux';
import {List} from 'immutable';
import Radium from 'radium';

export class DebuggerHistory extends React.Component {
  static propTypes = {
    history: React.PropTypes.instanceOf(List)
  };

  render() {
    const { history } = this.props;
    return (
      <ul style={styles.history}>
        {
          history.map((command, index) => {
            return <li style={styles.historyItem} key={index}>{command}</li>;
          })
        }
      </ul>
    );
  }
}

const styles = {
  history: {
    paddingLeft: 0
  },
  historyItem: {
    listStyleType: 'none'
  }
};

export default connect((state) => {
  return {
    history: state.get('commandHistory')
  };
})(Radium(DebuggerHistory));

