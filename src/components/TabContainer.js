import React, { PropTypes } from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import panelStyles from '../styles/panel';

export class TabContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    children: PropTypes.node,
    equalWidth: PropTypes.bool
  };

  render() {
    const { equalWidth } = this.props;
    return (
      <div style={[styles.all, equalWidth && styles.equalWidth]}>{this.props.children}</div>
    );
  }
}

export default Radium(TabContainer);

const styles = {
  all: {
    backgroundColor: '#e8e8e8',
    borderBottom: panelStyles.border,
    width: '100%'
  },
  equalWidth: {
    display: 'flex',
    flexFlow: 'row wrap'
  }
};
