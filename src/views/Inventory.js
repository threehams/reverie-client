import React from 'react';
import { List } from 'immutable';
import Radium from 'radium';
import shouldPureComponentUpdate from 'react-pure-render/function';

import InventoryItemContainer from './InventoryItem';
import LoadingCircle from '../components/LoadingCircle';

export class Inventory extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  static propTypes = {
    ids: React.PropTypes.instanceOf(List)
  };

  render() {
    const { ids } = this.props;
    return (
      <LoadingCircle showUntil={!!(ids && ids.size)}>
        <section style={styles}>
          { ids && ids.map(id => <InventoryItemContainer key={id} id={id} />) }
        </section>
      </LoadingCircle>
    );
  }
}

const styles = {
  padding: '2px 10px'
};

export default Radium(Inventory);
