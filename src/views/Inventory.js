import React, { PropTypes } from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import InventoryItemContainer from './InventoryItem';
import Loader from '../components/Loader';

export class Inventory extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    id: PropTypes.string
  };

  render() {
    const { id } = this.props;
    return (
      <Loader showUntil={!!(id)}>
        { id && <InventoryItemContainer key={id} id={id} containerId={id} expanded /> }
      </Loader>
    );
  }
}

export default Radium(Inventory);
