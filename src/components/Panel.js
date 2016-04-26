import React, { PropTypes } from 'react';
import Radium from 'radium';

export class Panel extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object
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
