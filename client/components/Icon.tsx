import * as React from 'react';
import Radium = require('radium');

interface IconProps {
  name: string;
  before?: boolean;
  style?: Object;
  onClick?: any;
}

@Radium
export class Icon extends React.Component<IconProps, {}> {
  public render() {
    const { name, before, style, ...rest } = this.props;

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
