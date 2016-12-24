import * as React from 'react';
import Radium = require('radium');
import { Set } from 'immutable';

import { Icon } from '../components/Icon';

export const TYPE_ICONS = {
  container: 'icon-folder',
  containerClosed: 'icon-folder-excluded',
  creature: 'fa fa-github-alt',
  executable: 'icon-file-js',
  locked: 'icon-locked',
  player: 'fa fa-user',
  room: 'fa fa-photo',
  text: 'icon-file-text',
  unlocked: 'icon-unlocked',
};

interface EntityIconProps {
  components?: Set<string>;
  states?: Set<string>;
  style?: Object;
  before?: boolean;
}

@Radium
export class EntityIcon extends React.Component<EntityIconProps, {}> {
  public static defaultProps = {
    components: Set(),
    states: Set(),
  };

  public render() {
    const { components, states, ...rest } = this.props;

    return (
      <Icon {...rest} name={this.iconFor(components, states)} />
    );
  }

  private iconFor(components: Set<string>, states: Set<string>) {
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
}
