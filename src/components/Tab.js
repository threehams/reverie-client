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
    display: 'inline-block',
    ...fontStyles.default,
  },
  inactive: {
    backgroundColor: '#d4d4d4',
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
