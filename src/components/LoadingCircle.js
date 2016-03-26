import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class LoadingCircle extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

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
