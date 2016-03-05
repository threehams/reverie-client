import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import Radium from 'radium';
import shouldPureComponentUpdate from 'react-pure-render/function';

import InventoryItemContainer from './InventoryItem';

export class Inventory extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  static propTypes = {
    ids: React.PropTypes.instanceOf(List)
  };

  render() {
    const { ids } = this.props;
    return (
      <section style={styles}>
        <span>inventory</span>
        { ids.map(id => <InventoryItemContainer key={id} id={id} />) }
      </section>
    );
  }
}

const styles = {
  padding: '2px 10px'
};

export default connect((state) => {
  return {
    ids: state.get('inventoryIds')
  };
})(Radium(Inventory));
