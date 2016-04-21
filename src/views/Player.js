import React, { PropTypes } from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import Icon from '../components/Icon';
import StatusEffect from '../components/StatusEffect';
import EntityRecord from '../records/EntityRecord';

export class Player extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    player: PropTypes.instanceOf(EntityRecord)
  };

  render() {
    const { player } = this.props;
    return (
      <div style={styles.container}>
        <ul style={styles.left}>
          <li>
            <StatusEffect>Health</StatusEffect>
          </li>
          <li>
            <StatusEffect>Memory</StatusEffect>
          </li>
          <li>
            <StatusEffect>Storage</StatusEffect>
          </li>
        </ul>
        <ul style={styles.right}>
          <li>
            <Icon name="heart-o" before />
            { player.currentHealth } / { player.maxHealth }
          </li>
          <li>
            <Icon name="laptop" before />
            { player.currentMemory } / { player.maxMemory }
          </li>
          <li>
            <Icon name="hdd-o" before />
            { player.currentStorage } / { player.maxStorage }
          </li>
        </ul>
      </div>
    );
  }
}

export default Radium(Player);

const styles = {
  container: {
    padding: 4
  },
  left: {
    display: 'inline-block',
    width: '34%'
  },
  right: {
    display: 'inline-block',
    width: '66%'
  }
};
