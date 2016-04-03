import React from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

export class Icon extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onDoubleClick: React.PropTypes.func,
    before: React.PropTypes.bool
  };

  render() {
    const { name, before, ...rest } = this.props;

    return (
      <i {...rest} className={`fa fa-${name}`} style={[styles.all, before && styles.before]} />
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
  }
};

export default Radium(Icon);
