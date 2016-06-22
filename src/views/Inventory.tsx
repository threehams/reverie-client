import * as React from 'react';
import { connect } from 'react-redux';
import Radium = require('radium');
import { List } from 'immutable';

import InventoryItem from './InventoryItem';
import { Loader } from '../components/Loader';
import * as editorActions from '../actions/editorActions';
import * as inventoryActions from '../actions/inventoryActions';
import * as inventorySelectors from '../selectors/inventorySelectors';
import { Entity, State } from '../records';

interface InventoryProps {
  addView: Function;
  items: List<Entity>;
  moveItem: Function;
  selectItem: Function;
  toggleExpand: Function;
  toggleItem: Function;
}

@Radium
export class Inventory extends React.Component<InventoryProps, {}> {
  public render() {
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
  (state: State, props) => ({
    items: inventorySelectors.list(state).get(props.owner),
  }),
  {
    addView: editorActions.addView,
    moveItem: inventoryActions.moveItem,
    selectItem: inventoryActions.selectItem,
    toggleExpand: inventoryActions.toggleExpand,
    toggleItem: inventoryActions.toggleItem,
  }
)(Inventory);

const styles = {
  container: {
    overflowY: 'auto',
  },
};
