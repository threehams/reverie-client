import * as React from 'react';
import shallowCompare = require('react-addons-shallow-compare');
import Radium = require('radium');

interface PanelProps {
  type: string;
  style?: Object | Object[];
}

@Radium
export class Panel extends React.Component<PanelProps, {}> {
  public shouldComponentUpdate(nextProps: PanelProps, nextState: {}) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { children, style } = this.props;
    return (
      <div style={style}>
        { children }
      </div>
    );
  }
}
