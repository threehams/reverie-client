import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import Radium from 'radium';
import shouldPureComponentUpdate from 'react-pure-render/function';

import InventoryItemContainer from './InventoryItem';
import LoadingCircle from '../components/LoadingCircle';
import * as inventoryActions from '../actions/inventory-actions';

export class Inventory extends React.Component {
  static propTypes = {
    ids: React.PropTypes.instanceOf(List),
    fetch: React.PropTypes.func
  };

  shouldComponentUpdate = shouldPureComponentUpdate;
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { ids } = this.props;
    return (
      <LoadingCircle showUntil={!!(ids && ids.size)}>
        <section style={styles}>
          { ids.map(id => <InventoryItemContainer key={id} id={id} />) }
        </section>
      </LoadingCircle>
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
}, inventoryActions)(Radium(Inventory));
