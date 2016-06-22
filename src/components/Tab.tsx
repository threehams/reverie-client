import * as React from 'react';
import Radium = require('radium');
import shallowCompare = require('react-addons-shallow-compare');

import { Icon } from '../components/Icon';
import panelStyles from '../styles/panel';
import fontStyles from '../styles/font';

interface TabProps {
  active?: boolean;
  onClick?: Function;
  onClickClose?: Function;
}

@Radium
export class Tab extends React.Component<TabProps, {}> {
  public shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { active, onClickClose } = this.props;
    return (
      <div style={[styles.global, active ? styles.active : styles.inactive]} onClick={this.elementClicked.bind(this)}>
        <span style={styles.label}>{ this.props.children }</span>
        { onClickClose && <Icon name="fa fa-times" onClick={(e) => { e.stopPropagation(); onClickClose(); }} /> }
      </div>
    );
  }

  private elementClicked(event) {
    const { onClick, onClickClose } = this.props;
    // Button 1 is middle click
    if (event.button === 1 && onClickClose) {
      onClickClose();
    } else if (onClick) {
      onClick();
    }
  }
}

export const styles = {
  active: {
    backgroundColor: 'white',
  },
  global: Object.assign(
    {
      borderRight: panelStyles.border,
      color: '#333333',
      cursor: 'default',
      display: 'inline-block',
      flex: '1 1 auto',
      padding: '3px 3px 3px 15px',
    },
    fontStyles.default
  ),
  inactive: {
    backgroundColor: '#d4d4d4',
  },
  label: {
    display: 'inline-block',
    marginRight: 10,
  },
};
