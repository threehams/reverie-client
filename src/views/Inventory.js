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
      <section>
        {
          inventoryIds.map(id => {
            return <InventoryItem key={id} item={inventoryById.get(id)} />;
          })
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inventoryIds: state.get('inventoryIds'),
    inventoryById: state.get('inventoryById')
  };
};

export default connect(mapStateToProps)(Radium(Inventory));
