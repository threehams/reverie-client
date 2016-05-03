import React, { PropTypes } from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import Icon from '../components/Icon';
import EntityRecord from '../records/EntityRecord';

export const TYPE_ICONS = {
  containerClosed: 'folder-o',
  container: 'folder-open-o',
  creature: 'github-alt',
  executable: 'file-code-o',
  locked: 'lock',
  player: 'user',
  room: 'photo',
  text: 'file-text-o',
  unlocked: 'unlock-alt',
};

export class EntityIcon extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    entity: PropTypes.instanceOf(EntityRecord).isRequired
  };

  iconFor(entity) {
    if (entity.states.contains('locked')) {
      return TYPE_ICONS.locked;
    }
    if (entity.states.contains('unlocked') && entity.states.contains('closed')) {
      return TYPE_ICONS.unlocked;
    }
    if (entity.components.contains('openable') && entity.states.contains('closed')) {
      return TYPE_ICONS.containerClosed;
    }
    for (const component of ['container', 'player', 'room', 'creature']) {
      if (entity.components.contains(component)) {
        return TYPE_ICONS[component];
      }
    }
    return TYPE_ICONS.text;
  }

  render() {
    const { entity, ...rest } = this.props;

    return (
      <Icon {...rest} name={this.iconFor(entity)} />
    );
  }
}

export default Radium(EntityIcon);
