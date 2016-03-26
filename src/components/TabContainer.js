import React from 'react';
import panelStyles from '../styles/panel';
import shallowCompare from 'react-addons-shallow-compare';

export default class TabContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

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
  backgroundColor: '#c8d1e1',
  borderBottom: panelStyles.border,
  width: '100%'
};
