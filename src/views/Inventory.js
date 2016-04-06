import React, { PropTypes } from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import InventoryItemContainer from './InventoryItem';
import LoadingCircle from '../components/LoadingCircle';

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
      <LoadingCircle showUntil={!!(id)}>
        { id && <InventoryItemContainer key={id} id={id} containerId={id} expanded /> }
      </LoadingCircle>
    );
  }
}

export default Radium(Inventory);
