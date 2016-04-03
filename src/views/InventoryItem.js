import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';
import { DragSource } from 'react-dnd';

import Icon from '../components/Icon';
import DropdownArrow from '../components/DropdownArrow';
import * as inventoryActions from '../actions/inventoryActions';
import * as editorActions from '../actions/editorActions';
import EntityRecord from '../records/entityRecord';

const TYPE_ICONS = {
  executable: 'file-code-o',
  container: 'folder-o',
  text: 'file-text-o'
};

export class InventoryItem extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    addView: React.PropTypes.func,
    containerId: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    item: React.PropTypes.instanceOf(EntityRecord).isRequired,
    indent: React.PropTypes.number,
    selected: React.PropTypes.bool,
    selectItem: React.PropTypes.func,
    toggleExpand: React.PropTypes.func,
    toggleItem: React.PropTypes.func
  };

  static defaultProps = {
    indent: 1
  };

  expandItem(event, item) {
    event.stopPropagation();
    if (event.shiftKey || event.ctrlKey) return;
    if (item.type === 'container') {
      this.props.toggleExpand(item.id);
    } else {
      this.props.addView(item.id);
    }
  }

  selectItem(event, item, containerId) {
    event.stopPropagation();
    if (event.ctrlKey) {
      this.props.toggleItem(item.id, containerId);
    } else if (event.shiftKey) {
      this.props.selectItem(item.id, containerId, {multiple: true});
    } else {
      this.props.selectItem(item.id, containerId);
    }
  }

  render() {
    const { indent, item, containerId, expanded, selected } = this.props;
    return (
      <div onMouseDown={(event) => this.selectItem(event, item, containerId)}
           onDoubleClick={(event) => this.expandItem(event, item, containerId)}>
        <div style={[styles.item, selected && styles.selected, { paddingLeft: styles.indent * indent }]}>
          {
            item.entities.size ?
              <DropdownArrow expanded={expanded}
                             onMouseDown={(event) => this.expandItem(event, item)} /> :
              <span style={{ paddingLeft: 18 }} />
          }
          <Icon name={TYPE_ICONS[item.type] || 'file-text-o'} color={styles[item.type]} before />
          <span style={{cursor: 'default'}}>{ item.name + (item.quantity > 1 ? ` (${item.quantity})` : '') }</span>
        </div>
        {
          expanded ?
            item.entities.map(id => {
              return <div key={id}>
                <InventoryItemContainer id={id} indent={indent + 1} containerId={containerId} />
              </div>;
            }) :
            null
        }
      </div>
    );
  }
}

// const DraggableInventoryItem = DragSource('INVENTORY_ITEM', )(InventoryItem)

const InventoryItemContainer = connect(
  (state, props) => {
    return {
      item: state.getIn(['entities', props.id]),
      selected: state.getIn(['ui', 'selectedItems']).contains(props.id),
      expanded: !!state.getIn(['ui', 'inventoryExpandedById', props.id])
    };
  },
  {
    addView: editorActions.addView,
    selectItem: inventoryActions.selectItem,
    toggleExpand: inventoryActions.toggleExpand,
    toggleItem: inventoryActions.toggleItem
  }
)(Radium(InventoryItem));

export default InventoryItemContainer;

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
  }
};
