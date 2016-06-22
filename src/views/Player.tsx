import * as React from 'react';
import Radium = require('radium');
import {connect} from 'react-redux';

import { Icon } from '../components/Icon';
import StatusEffect from '../components/StatusEffect';
import { Entity, State } from '../records';

interface PlayerProps {
  player: Entity;
}

@Radium
export class Player extends React.Component<PlayerProps, {}> {
  public render() {
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

export default connect((state: State) => ({
  player: state.entities.get(state.ui.player),
}))(Player);

const styles = {
  container: {
    padding: 4,
  },
  left: {
    display: 'inline-block',
    width: '34%',
  },
  right: {
    display: 'inline-block',
    width: '66%',
  },
};
