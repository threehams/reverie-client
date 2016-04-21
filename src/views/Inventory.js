import React, { PropTypes } from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';
import { List } from 'immutable';

import InventoryItem from './InventoryItem';
import Loader from '../components/Loader';

export class Inventory extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    ids: PropTypes.instanceOf(List)
  };

  render() {
    const { ids } = this.props;
    return (
      <Loader showUntil={!!(ids)}>
        { ids && ids.map(id => <InventoryItem key={id} id={id} containerId={id} />) }
      </Loader>
    );
  }
}

export default Radium(Inventory);
