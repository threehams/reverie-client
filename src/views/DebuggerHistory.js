import React from 'react';
import { connect } from 'react-redux';
import {List} from 'immutable';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

export class DebuggerHistory extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    history: React.PropTypes.instanceOf(List)
  };

  render() {
    const { history } = this.props;
    return (
      <ul style={styles.main}>
        {
          history.map((command, index) => {
            return <li style={styles.item} key={index}>{command}</li>;
          })
        }
      </ul>
    );
  }
}

const styles = {
  main: {
    padding: 10
  }
};

export default connect((state) => {
  return {
    history: state.get('commandHistory')
  };
})(Radium(DebuggerHistory));

