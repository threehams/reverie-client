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
    before: React.PropTypes.bool,
    style: React.PropTypes.object,
  };

  render() {
    const { name, before, style, ...rest } = this.props;

    return (
      <i {...rest} className={`${name}`} style={[style, styles.all, before && styles.before]} />
    );
  }
}

const styles = {
  all: {
    display: 'inline-block',
  },
  before: {
    marginRight: 6
  }
};

export default Radium(Icon);
