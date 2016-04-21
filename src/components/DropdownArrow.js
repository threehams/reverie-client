import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import Icon from '../components/Icon';
import StatusEffect from '../components/StatusEffect';

export default class DropdownArrow extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    expanded: React.PropTypes.bool
  };

  render() {
    const { expanded, ...rest } = this.props;
    return (
      <StatusEffect><Icon {...rest} name={ expanded ? 'caret-down' : 'caret-right' } before /></StatusEffect>
    );
  }
}
