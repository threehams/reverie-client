import React from 'react';
import Radium from 'radium';

import Icon from '../components/Icon';
import * as panelStyles from '../styles/panel';

class Tab extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    children: React.PropTypes.node,
    closeable: React.PropTypes.bool,
    onClickClose: React.PropTypes.func,
    onClick: React.PropTypes.func
  };

  render() {
    const { active, onClick, onClickClose } = this.props;
    return (
      <div style={[styles.global, active ? styles.active : styles.inactive]} onClick={onClick}>
        <div style={styles.label}>{ this.props.children }</div>
        { onClickClose ? <Icon name="times" onClick={(e) => { e.stopPropagation(); onClickClose(); }} /> : null }
      </div>
    );
  }
}

const styles = {
  global: {
    padding: '5px 5px 5px 15px',
    borderRight: panelStyles.border,
    display: 'inline-block'
  },
  inactive: {
    cursor: 'pointer'
  },
  active: {
    borderLeft: '1px solid #333',
    backgroundColor: '#666',
    color: 'white'
  },
  label: {
    display: 'inline-block',
    marginRight: 10
  }
};

export default Radium(Tab);
