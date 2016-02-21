import React from 'react';
import {Map} from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from '../components/Icon';
import * as inventoryActions from '../actions/inventory-actions';

export class InventoryItem extends React.Component {
  static propTypes = {
    item: React.PropTypes.instanceOf(Map),
    inventoryById: React.PropTypes.instanceOf(Map),
    inventoryExpandedById: React.PropTypes.instanceOf(Map),
    toggleExpand: React.PropTypes.func
  };

  render() {
    const { item, inventoryById, inventoryExpandedById, toggleExpand } = this.props;
    const expanded = inventoryExpandedById.get(item.get('id'));
    return (
      <div>
        { item.get('itemIds') ? <Icon name={ expanded ? 'chevron-down' : 'chevron-right' } onClick={() => toggleExpand(item.get('id'))} /> : null }
        <span style={{ paddingLeft: 4 }}>{ item.get('name') }</span>
        {
          item.get('itemIds') && expanded ?
            item.get('itemIds').map(id => {
              return <div style={{ paddingLeft: 16 }}>
                <InventoryItemContainer key={id} item={inventoryById.get(id)} />
              </div>;
            }) :
            null
        }
      </div>
    );
  }
}

const InventoryItemContainer = connect(
  state => {
    return {
      inventoryById: state.get('inventoryById'),
      inventoryExpandedById: state.getIn(['ui', 'inventoryExpandedById'])
    };
  },
  inventoryActions
)(InventoryItem);

export default InventoryItemContainer;
