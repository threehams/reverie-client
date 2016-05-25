import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import Icon from '../components/Icon';

export default class DropdownArrow extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* istanbul ignore next */
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    expanded: React.PropTypes.bool
  };

  render() {
    const { expanded, ...rest } = this.props;
    return (
      <Icon {...rest} name={ expanded ? 'icon-arrow-down' : 'icon-arrow-right' } before />
    );
  }
}
