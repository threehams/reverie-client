import React from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import Icon from '../components/Icon';
import panelStyles from '../styles/panel';
import fontStyles from '../styles/font';

class Tab extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    active: React.PropTypes.bool,
    children: React.PropTypes.node,
    onClickClose: React.PropTypes.func,
    onClick: React.PropTypes.func
  };

  elementClicked(event) {
    const { onClick, onClickClose } = this.props;
    // Button 1 is middle click
    if (event.button === 1 && onClickClose) {
      onClickClose();
    } else if (onClick) {
      onClick();
    }
  }

  render() {
    const { active, onClickClose } = this.props;
    return (
      <div style={[styles.global, active ? styles.active : styles.inactive]} onClick={::this.elementClicked}>
        <span style={styles.label}>{ this.props.children }</span>
        { onClickClose && <Icon name="times" onClick={(e) => { e.stopPropagation(); onClickClose(); }} /> }
      </div>
    );
  }
}

export const styles = {
  global: {
    cursor: 'default',
    color: '#333333',
    padding: '3px 3px 3px 15px',
    borderRight: panelStyles.border,
    display: 'inline-block',
    ...fontStyles.default,
    flex: '1 1 auto'
  },
  inactive: {
    backgroundColor: '#d4d4d4'
  },
  active: {
    backgroundColor: 'white',
  },
  label: {
    display: 'inline-block',
    marginRight: 10
  }
};

export default Radium(Tab);
