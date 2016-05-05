import React, { PropTypes } from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';
import { Set } from 'immutable';

import Icon from '../components/Icon';

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
    states: PropTypes.instanceOf(Set),
    components: PropTypes.instanceOf(Set)
  };

  static defaultProps = {
    states: Set(),
    components: Set(),
  };

  iconFor(components, states) {
    if (states.contains('locked')) {
      return TYPE_ICONS.locked;
    }
    if (states.contains('unlocked') && states.contains('closed')) {
      return TYPE_ICONS.unlocked;
    }
    if (components.contains('openable') && states.contains('closed')) {
      return TYPE_ICONS.containerClosed;
    }
    for (const component of ['container', 'player', 'room', 'creature']) {
      if (components.contains(component)) {
        return TYPE_ICONS[component];
      }
    }
    return TYPE_ICONS.text;
  }

  render() {
    const { components, states, ...rest } = this.props;

    return (
      <Icon {...rest} name={this.iconFor(components, states)} />
    );
  }
}

export default Radium(EntityIcon);
