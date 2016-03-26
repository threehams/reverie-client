import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class Icon extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    onDoubleClick: React.PropTypes.func,
    before: React.PropTypes.bool
  };

  render() {
    const { name, onClick, onDoubleClick, before } = this.props;
    const style = Object.assign(
      {},
      styles.all,
      before ? styles.before : null,
      onClick ? styles.interactive : null
    );
    return (
      <i className={`fa fa-${name}`} style={style} onClick={onClick} onDoubleClick={onDoubleClick} />
    );
  }
}

const styles = {
  all: {
    display: 'inline-block',
    height: 16,
    width: 16
  },
  before: {
    marginRight: 2
  },
  interactive: {
    cursor: 'pointer'
  }
};
