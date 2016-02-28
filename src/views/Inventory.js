import React from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import Radium from 'radium';

import InventoryItem from './InventoryItem';

export class Inventory extends React.Component {
  static propTypes = {
    inventoryById: React.PropTypes.instanceOf(Map),
    inventoryIds: React.PropTypes.instanceOf(List)
  };

  render() {
    const { inventoryIds, inventoryById } = this.props;
    return (
      <section style={styles}>
        <span>inventory</span>
        {
          inventoryIds.map(id => {
            return <InventoryItem key={id} item={inventoryById.get(id)} />;
          })
        }
      </section>
    );
  }
}

const styles = {
  padding: '2px 10px'
};

export default connect((state) => {
  return {
    inventoryIds: state.get('inventoryIds'),
    inventoryById: state.get('inventoryById')
  };
})(Radium(Inventory));
