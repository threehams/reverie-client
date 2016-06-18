import * as React from 'react';
import Radium = require('radium');
import shallowCompare = require('react-addons-shallow-compare');

import panelStyles from '../styles/panel';

interface TabContainerProps {
  equalWidth?: boolean;
}

@Radium
export class TabContainer extends React.Component<TabContainerProps, {}> {
  public shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { equalWidth } = this.props;
    return (
      <div style={[styles.all, equalWidth && styles.equalWidth]}>{this.props.children}</div>
    );
  }
}

const styles = {
  all: {
    backgroundColor: '#e8e8e8',
    borderBottom: panelStyles.border,
    width: '100%',
  },
  equalWidth: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
};
