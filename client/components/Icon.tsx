import * as React from 'react';
import Radium = require('radium');
import * as _ from 'lodash';

interface IconProps {
  name: string;
  before?: boolean;
  style?: Object;
  onClick?: Function;
}

@Radium
export class Icon extends React.Component<IconProps, {}> {
  public render() {
    const { name, before, style } = this.props;
    const rest = _.omit(this.props, ['name', 'before', 'style']);

    return (
      <i {...rest} className={`${name}`} style={[style, styles.all, before && styles.before]} />
    );
  }
}

const styles = {
  all: {
    display: 'inline-block',
  },
  before: {
    marginRight: 6,
  },
};
