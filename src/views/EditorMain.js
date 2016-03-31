import React from 'react';
import { List } from 'immutable';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

class EditorMain extends React.Component {
  componentDidUpdate() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    history: React.PropTypes.instanceOf(List),
    height: React.PropTypes.string
  };

  render() {
    const { height, history } = this.props;
    const paddingLeft = Math.ceil(history.size.toString().length - 1) * 14 + 20;
    return (
      <div style={[styles.container, { paddingLeft, height }]} ref={(container) => { this.container = container; } }>
        <ul style={[styles.numbers, {minHeight: height}]}>
          { history.map((item, index) => <li key={index} style={styles.numbersItem}>{index}</li>) }
        </ul>
        <ul style={[styles.list, { minHeight: height}]}>
          { history.map((item, index) => <li key={index}>{ item || '\u00a0' }</li>) }
        </ul>
      </div>
    );
  }
}

export default Radium(EditorMain);

const styles = {
  container: {
    position: 'relative',
    overflowY: 'auto',
    backgroundColor: '#f0f0f0'
  },
  numbers: {
    cursor: 'default',
    position: 'absolute',
    left: 4,
    textAlign: 'right'
  },
  numbersItem: {
    color: '#800000'
  },
  list: {
    backgroundColor: 'white',
    borderLeft: '1px solid #d0d0d0',
    paddingLeft: 4
  }
};
