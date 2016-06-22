import * as React from 'react';
import shallowCompare = require('react-addons-shallow-compare');
import * as _ from 'lodash';

import { Icon } from './Icon';

interface DropdownArrowProps {
  expanded?: boolean;
  onMouseDown?: Function;
  style?: Object;
}

export class DropdownArrow extends React.Component<DropdownArrowProps, {}> {
  public shouldComponentUpdate(nextProps, nextState) {
    /* istanbul ignore next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { expanded } = this.props;
    const rest = _.omit(this.props, 'expanded');
    return (
      <Icon {...rest} name={ expanded ? 'icon-arrow-down' : 'icon-arrow-right' } before />
    );
  }
}
