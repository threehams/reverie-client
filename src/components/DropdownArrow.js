import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import Icon from '../components/Icon';

export default class DropdownArrow extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    expanded: React.PropTypes.bool,
    onMouseDown: React.PropTypes.func
  };

  render() {
    const { expanded, ...rest } = this.props;
    return (
      <Icon {...rest} name={ expanded ? 'caret-down' : 'caret-right' } before />
    );
  }
}
