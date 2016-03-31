import React from 'react';
import { List } from 'immutable';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import InventoryItemContainer from './InventoryItem';
import LoadingCircle from '../components/LoadingCircle';

export class Inventory extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    ids: React.PropTypes.instanceOf(List),
    containerId: React.PropTypes.string
  };

  render() {
    const { containerId, ids } = this.props;
    return (
      <LoadingCircle showUntil={!!(ids)}>
        <section>
          { ids && ids.map(id => <InventoryItemContainer key={id} id={id} containerId={containerId} />) }
        </section>
      </LoadingCircle>
    );
  }
}

export default Radium(Inventory);
