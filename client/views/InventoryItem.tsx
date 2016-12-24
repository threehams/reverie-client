import * as React from 'react';
import Radium = require('radium');
import shallowCompare = require('react-addons-shallow-compare');
import { DragSource, DropTarget } from 'react-dnd';

import { DropdownArrow, EntityIcon } from '../components';
import StatusEffect from '../components/StatusEffect';
import { Entity } from '../records';

interface InventoryItemProps {
  addView: Function;
  canDrop?: boolean;
  connectDragSource?: Function;
  connectDropTarget?: Function;
  isOver?: boolean;
  item: Entity;
  moveItem: Function;
  selectItem: Function;
  toggleExpand: Function;
  toggleItem: Function;
}

@Radium
export class InventoryItem extends React.Component<InventoryItemProps, {}> {
  public shouldComponentUpdate(nextProps: InventoryItemProps, nextState: {}) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { item, canDrop, isOver, connectDragSource, connectDropTarget } = this.props;
    return connectDragSource(
      connectDropTarget(
        <div style={[styles.item, item.selected && styles.selected, { paddingLeft: styles.indent * item.indent }]}
             onMouseDown={(event) => this.selectItem(event, item)}
             onDoubleClick={(event) => this.expandItem(event, item)}>
          {
            item.entities.size ?
              <DropdownArrow expanded={item.expanded}
                           onMouseDown={(event: React.MouseEvent) => this.expandItem(event, item)}
                           style={{ display: 'inline-block', verticalAlign: 'middle' }}
              /> :
              <span style={{ paddingLeft: 22 }}/>
          }
          <EntityIcon
            style={{ verticalAlign: 'middle' }}
            states={item.states}
            components={item.components}
            before
          />
          <span style={[{cursor: 'default'}, isOver && canDrop && styles.canDrop, { verticalAlign: 'middle' }]}>
            <StatusEffect>{ item.name + (item.quantity > 1 ? ` (${item.quantity})` : '') }</StatusEffect>
          </span>
        </div>
      )
    );
  }

  private expandItem(event: React.MouseEvent, item: Entity) {
    event.stopPropagation();
    if (item.entities.size) {
      this.props.toggleExpand(item.id);
    } else {
      this.props.addView(item.id);
    }
  }

  private selectItem(event: React.MouseEvent, item: Entity) {
    event.stopPropagation();
    if (event.ctrlKey) {
      this.props.toggleItem(item.id, item.owner);
    } else if (event.shiftKey) {
      this.props.selectItem(item.id, item.owner, { multiple: true });
    } else {
      this.props.selectItem(item.id, item.owner);
    }
  }
}

const inventoryItemSource = {
  beginDrag(props: InventoryItemProps) {
    return {
      id: props.item.id,
      path: props.item.path,
    };
  },
};

const inventoryItemTarget = {
  drop(props: InventoryItemProps, monitor) {
    const item = monitor.getItem();
    props.moveItem(item.path, props.item.path);
  },
  canDrop(props: InventoryItemProps, monitor) {
    const item = monitor.getItem();
    return props.item.components.contains('container') && item.id !== props.item.id;
  },
};

const collectDrag = (dragConnect) => ({
  connectDragSource: dragConnect.dragSource(),
});

const collectDrop = (dropConnect, monitor) => ({
  canDrop: monitor.canDrop(),
  connectDropTarget: dropConnect.dropTarget(),
  isOver: monitor.isOver(),
});

const DraggableInventoryItem = DragSource('INVENTORY_ITEM', inventoryItemSource, collectDrag)(
  DropTarget('INVENTORY_ITEM', inventoryItemTarget, collectDrop)(InventoryItem)
);

export default DraggableInventoryItem as React.ComponentClass<InventoryItemProps>;

const styles = {
  canDrop: {
    outline: '1px solid red',
  },
  container: {
    color: '#bd9662',
  },
  indent: 16,
  item: {
    display: 'block',
    paddingBottom: 1,
    paddingTop: 1,
    userSelect: 'none',
  },
  selected: {
    backgroundColor: '#3875d6',
    color: 'white',
  },
};
