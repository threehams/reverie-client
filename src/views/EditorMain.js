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
    const marginLeft = Math.ceil(Math.ceil((history.size + 1).toString().length) * 7.5);
    const items = history.map((item, index) => {
      return (
        <li key={index}>
          <span style={[styles.counter, {width: marginLeft + 4}]}>{index}</span>
          { item || '\u00a0' }
        </li>
      );
    });
    return (
      <div style={[styles.container, { height }]} ref={(container) => { this.container = container; } }>
        <ol style={[styles.list, { marginLeft: marginLeft + 20, minHeight: height}]}>
          { items }
        </ol>
      </div>
    );
  }
}

export default Radium(EditorMain);

const styles = {
  container: {
    backgroundColor: '#f0f0f0',
    overflowY: 'auto',
    position: 'relative'
  },
  counter: {
    color: '#800000',
    cursor: 'default',
    display: 'inline-block',
    left: 0,
    position: 'absolute',
    textAlign: 'right'
  },
  list: {
    backgroundColor: 'white',
    paddingLeft: 4
  }
};
