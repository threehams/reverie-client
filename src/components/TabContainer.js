import React from 'react';

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
  borderBottom: '1px solid black',
  width: '100%'
};
