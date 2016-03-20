import React from 'react';
import * as panelStyles from '../styles/panel';

export default class TabContainer extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  };

  render() {
    return (
      <div style={styles}>{this.props.children}</div>
    );
  }
}

const styles = {
  borderBottom: panelStyles.border,
  width: '100%'
};
