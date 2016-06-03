import React from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

export class Icon extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* istanbul ignore next */
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    name: React.PropTypes.string.isRequired,
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
    height: 15,
    width: 15
  },
  before: {
    marginRight: 2
  }
};

export default Radium(Icon);
