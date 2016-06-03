import React, { PropTypes } from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

export class Panel extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    type: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.oneOf(PropTypes.object, PropTypes.array)
  };

  render() {
    const { children, style } = this.props;
    return (
      <div style={style}>
        { children }
      </div>
    );
  }
}

export default Radium(Panel);
