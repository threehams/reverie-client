import React from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import Icon from '../components/Icon';
import panelStyles from '../styles/panel';
import fontStyles from '../styles/font';

class Tab extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    active: React.PropTypes.bool,
    children: React.PropTypes.node,
    closeable: React.PropTypes.bool,
    onClickClose: React.PropTypes.func,
    onClick: React.PropTypes.func
  };

  elementClicked(event) {
    // Button 1 is middle click
    if (event.button === 1 && this.props.onClickClose) {
      return this.props.onClickClose();
    }
    return this.props.onClick();
  }

  render() {
    const { active, onClickClose } = this.props;
    return (
      <div style={[styles.global, active ? styles.active : styles.inactive]} onClick={::this.elementClicked}>
        <div style={styles.label}>{ this.props.children }</div>
        { onClickClose && <Icon name="times" onClick={(e) => { e.stopPropagation(); onClickClose(); }} /> }
      </div>
    );
  }
}

const styles = {
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
