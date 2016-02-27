import React from 'react';
import {Map} from 'immutable';
import { connect } from 'react-redux';
import Radium from 'radium';

import Icon from '../components/Icon';
import * as inventoryActions from '../actions/inventory-actions';
import InventoryItemRecord from '../records/inventory-item-record';

export class InventoryItem extends React.Component {
  static propTypes = {
    item: React.PropTypes.instanceOf(InventoryItemRecord),
    inventoryById: React.PropTypes.instanceOf(Map),
    expanded: React.PropTypes.bool,
    toggleExpand: React.PropTypes.func
  };

  render() {
    const { item, inventoryById, expanded, toggleExpand } = this.props;
    return (
      <div>
        { item.itemIds.size ? <DropdownArrow expanded={expanded} onClick={() => toggleExpand(item.id)} /> : null }
        <span style={{ paddingLeft: 4 }}>{ item.name }</span>
        {
          expanded ?
            item.itemIds.map(id => {
              return <div key={id} style={{ paddingLeft: 16 }}>
                <InventoryItemContainer item={inventoryById.get(id)} />
              </div>;
            }) :
            null
        }
      </div>
    );
  }
}

export default class DropdownArrow extends React.Component {
  static propTypes = {
    expanded: React.PropTypes.bool,
    onClick: React.PropTypes.func
  };

  render() {
    return (
      <Icon name={ this.props.expanded ? 'chevron-down' : 'chevron-right' } onClick={this.props.onClick} />
    );
  }
}


const InventoryItemContainer = connect(
  (state, props) => {
    return {
      inventoryById: state.get('inventoryById'),
      inventoryExpandedById: state.getIn(['ui', 'inventoryExpandedById']),
      expanded: !!state.getIn(['ui', 'inventoryExpandedById', props.item.id])
    };
  },
  inventoryActions
)(Radium(InventoryItem));

export default InventoryItemContainer;
