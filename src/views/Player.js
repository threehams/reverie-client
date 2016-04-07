import React, { PropTypes } from 'react';
import Radium from 'radium';

import Icon from '../components/Icon';
import EntityRecord from '../records/entityRecord';

export class Player extends React.Component {
  static propTypes = {
    player: PropTypes.instanceOf(EntityRecord)
  };

  render() {
    const { player } = this.props;
    return (
      <div style={styles.container}>
        <ul style={styles.left}>
          <li>
            Health
          </li>
          <li>
            Memory
          </li>
          <li>
            Storage
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
