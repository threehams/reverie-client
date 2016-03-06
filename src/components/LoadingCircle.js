import React from 'react';

export default class LoadingCircle extends React.Component {
  static propTypes = {
    showUntil: React.PropTypes.bool,
    children: React.PropTypes.node
  };

  render() {
    if (!this.props.showUntil) {
      return <div className="loader" />;
    }
    return this.props.children;
  }
}
