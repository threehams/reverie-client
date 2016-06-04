import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';
import { List } from 'immutable';

import InventoryItem from './InventoryItem';
import Loader from '../components/Loader';
import * as editorActions from '../actions/editorActions';
import * as inventoryActions from '../actions/inventoryActions';
import * as inventorySelectors from '../selectors/inventorySelectors';

export class Inventory extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    addView: PropTypes.func,
    items: PropTypes.instanceOf(List),
    moveItem: PropTypes.func,
    selectItem: PropTypes.func,
    toggleExpand: PropTypes.func,
    toggleItem: PropTypes.func
  };

  render() {
    const { addView, items, moveItem, selectItem, toggleExpand, toggleItem } = this.props;
    return (
      <div style={styles.container}>
        <Loader showUntil={!!items}>
          {
            items && items.map(entity => {
              return (
                <InventoryItem key={entity.id}
                               item={entity}
                               addView={addView}
                               moveItem={moveItem}
                               selectItem={selectItem}
                               toggleExpand={toggleExpand}
                               toggleItem={toggleItem}
                />
              );
            })
          }
        </Loader>
      </div>
    );
  }
}

export default connect(
  (state, props) => ({
    items: inventorySelectors.list(state).get(props.owner)
  }),
  {
    addView: editorActions.addView,
    moveItem: inventoryActions.moveItem,
    selectItem: inventoryActions.selectItem,
    toggleExpand: inventoryActions.toggleExpand,
    toggleItem: inventoryActions.toggleItem
  }
)(Radium(Inventory));

const styles = {
  container: {
    overflowY: 'auto',
  }
};
