import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import shouldPureComponentUpdate from 'react-pure-render/function';

import Icon from '../components/Icon';
import * as inventoryActions from '../actions/inventory-actions';
import EntityRecord from '../records/entity-record';

const TYPE_ICONS = {
  script: 'file-code-o',
  folder: 'folder-o',
  text: 'file-text-o'
};

export class InventoryItem extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  static propTypes = {
    item: React.PropTypes.instanceOf(EntityRecord),
    expanded: React.PropTypes.bool,
    toggleExpand: React.PropTypes.func
  };

  render() {
    const { item, expanded, toggleExpand, addView } = this.props;
    return (
      <div style={{ paddingLeft: 16 }}>
        {
          item.entities.size ?
            <DropdownArrow expanded={expanded} onClick={() => toggleExpand(item.id)} /> :
            <span style={{ paddingLeft: 18 }} />
        }
        <Icon name={TYPE_ICONS[item.type] || 'file-text-o'}
              before
              onDoubleClick={(e) => { e.preventDefault(); addView(item.id); }} />
        <span style={{cursor: 'default'}}>{ item.name }</span>
        {
          expanded ?
            item.entities.map(id => {
              return <div key={id}>
                <InventoryItemContainer id={id} />
              </div>;
            }) :
            null
        }
      </div>
    );
  }
}

class DropdownArrow extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  static propTypes = {
    expanded: React.PropTypes.bool,
    onClick: React.PropTypes.func
  };

  render() {
    const { expanded, onClick } = this.props;
    return (
      <Icon name={ expanded ? 'caret-down' : 'caret-right' } onClick={ onClick } before />
    );
  }
}

const InventoryItemContainer = connect(
  (state, props) => {
    return {
      item: state.getIn(['entities', props.id]),
      expanded: !!state.getIn(['ui', 'inventoryExpandedById', props.id])
    };
  },
  inventoryActions
)(Radium(InventoryItem));

export default InventoryItemContainer;
