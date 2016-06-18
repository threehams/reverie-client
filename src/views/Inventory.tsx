import * as React from 'react';
import { connect } from 'react-redux';
import Radium = require('radium');
import shallowCompare = require('react-addons-shallow-compare');
import { List } from 'immutable';

import InventoryItem from './InventoryItem';
import { Loader } from '../components/Loader';
import * as editorActions from '../actions/editorActions';
import * as inventoryActions from '../actions/inventoryActions';
import * as inventorySelectors from '../selectors/inventorySelectors';
import { EntityType } from '../records/EntityRecord';

interface InventoryProps {
  addView: Function;
  items: List<EntityType>;
  moveItem: Function;
  selectItem: Function;
  toggleExpand: Function;
  toggleItem: Function;
}

export class Inventory extends React.Component<InventoryProps, {}> {
  public shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

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
  (state, props) => ({
    items: inventorySelectors.list(state).get(props.owner),
  }),
  {
    addView: editorActions.addView,
    moveItem: inventoryActions.moveItem,
    selectItem: inventoryActions.selectItem,
    toggleExpand: inventoryActions.toggleExpand,
    toggleItem: inventoryActions.toggleItem,
  }
)(Radium(Inventory));

const styles = {
  container: {
    overflowY: 'auto',
  },
};
