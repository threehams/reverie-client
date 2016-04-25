import React, { PropTypes } from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';
import { DragSource, DropTarget } from 'react-dnd';

import Icon from '../components/Icon';
import StatusEffect from '../components/StatusEffect';
import DropdownArrow from '../components/DropdownArrow';
import EntityRecord from '../records/EntityRecord';

const TYPE_ICONS = {
  container: 'folder-o',
  creature: 'github-alt',
  executable: 'file-code-o',
  player: 'user',
  room: 'photo',
  text: 'file-text-o'
};

export class InventoryItem extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    addView: PropTypes.func,
    canDrop: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func,
    isOver: PropTypes.bool.isRequired,
    item: PropTypes.instanceOf(EntityRecord).isRequired,
    moveItem: PropTypes.func,
    selectItem: PropTypes.func,
    toggleExpand: PropTypes.func,
    toggleItem: PropTypes.func
  };

  expandItem(event, item) {
    event.stopPropagation();
    if (event.shiftKey || event.ctrlKey) return;
    if (item.entities.size) {
      this.props.toggleExpand(item.id);
    } else {
      this.props.addView(item.id);
    }
  }

  selectItem(event, item) {
    event.stopPropagation();
    if (event.ctrlKey) {
      this.props.toggleItem(item.id, item.owner);
    } else if (event.shiftKey) {
      this.props.selectItem(item.id, item.owner, { multiple: true });
    } else {
      this.props.selectItem(item.id, item.owner);
    }
  }

  // TODO pretty obviously temp code
  iconFor(item) {
    if (item.components.contains('container')) {
      return TYPE_ICONS.container;
    }
    if (item.components.contains('player')) {
      return TYPE_ICONS.player;
    }
    if (item.components.contains('room')) {
      return TYPE_ICONS.room;
    }
    if (item.components.contains('creature')) {
      return TYPE_ICONS.creature;
    }
    return TYPE_ICONS.text;
  }

  render() {
    const { item, canDrop, isOver, connectDragSource, connectDropTarget } = this.props;
    return connectDragSource(
      connectDropTarget(
        <div onMouseDown={(event) => this.selectItem(event, item)}
             onDoubleClick={(event) => this.expandItem(event, item)}>
          <div style={[styles.item, item.selected && styles.selected, { paddingLeft: styles.indent * item.indent }]}>
            {
              item.entities.size ?
                <DropdownArrow expanded={item.expanded}
                               onMouseDown={(event) => this.expandItem(event, item)}/> :
                <span style={{ paddingLeft: 18 }}/>
            }
            <StatusEffect><Icon name={this.iconFor(item)} color={styles[item.type]} before/></StatusEffect>
            <span style={[{cursor: 'default'}, isOver && canDrop && styles.canDrop]}>
              <StatusEffect>{ item.name + (item.quantity > 1 ? ` (${item.quantity})` : '') }</StatusEffect>
            </span>
          </div>
        </div>
      )
    );
  }
}

const inventoryItemSource = {
  beginDrag(props) {
    return {
      id: props.item.id,
      path: props.item.path
    };
  }
};

const inventoryItemTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    props.moveItem(item.path, props.item.path);
  },
  canDrop(props, monitor) {
    const item = monitor.getItem();
    return props.item.components.contains('container') && item.id !== props.item.id;
  }
};

function collectDrag(dragConnect) {
  return {
    connectDragSource: dragConnect.dragSource()
  };
}

function collectDrop(dropConnect, monitor) {
  return {
    connectDropTarget: dropConnect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

const DraggableInventoryItem = DragSource('INVENTORY_ITEM', inventoryItemSource, collectDrag)(
  DropTarget('INVENTORY_ITEM', inventoryItemTarget, collectDrop)(Radium(InventoryItem))
);

export default DraggableInventoryItem;

const styles = {
  indent: 16,
  item: {
    display: 'block',
    paddingBottom: 2,
    paddingTop: 2,
    userSelect: 'none'
  },
  selected: {
    backgroundColor: '#3875d6',
    color: 'white'
  },
  container: {
    color: '#bd9662'
  },
  canDrop: {
    outline: '1px solid red'
  }
};
