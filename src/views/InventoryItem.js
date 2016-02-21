import React from 'react';
import {Map} from 'immutable';
import { connect } from 'react-redux';
import Icon from '../components/Icon';

export class InventoryItem extends React.Component {
  static propTypes = {
    item: React.PropTypes.instanceOf(Map),
    inventoryById: React.PropTypes.instanceOf(Map)
  };

  render() {
    const { item, inventoryById } = this.props;
    return (
      <div>
        { item.get('itemIds') ? <Icon name="plus" /> : null }
        <span>{ item.get('name') }</span>
        {
          item.get('itemIds') ?
            item.get('itemIds').map(id => {
              return <InventoryItem key={id} item={inventoryById.get(id)} />;
            }) :
            null
        }
      </div>
    );
  }
}

export default connect(state => {
  return {
    inventoryById: state.get('inventoryById')
  };
})(InventoryItem);
