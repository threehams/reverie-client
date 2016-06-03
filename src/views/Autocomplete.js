import React, { PropTypes } from 'react';
import {List} from 'immutable';
import shallowCompare from 'react-addons-shallow-compare';

import CommandRecord from '../records/CommandRecord';
import EntityRecord from '../records/EntityRecord';
import ExitRecord from '../records/ExitRecord';

import StatusEffect from '../components/StatusEffect';

export class Autocomplete extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate() {
    if (this.selectedItem) {
      this.selectedItem.scrollIntoView(false);
    }
  }

  static propTypes = {
    fragment: PropTypes.string,
    focused: PropTypes.bool,
    options: PropTypes.instanceOf(List),
    onClickItem: PropTypes.func,
    selectedItem: PropTypes.oneOfType([
      PropTypes.instanceOf(CommandRecord),
      PropTypes.instanceOf(EntityRecord),
      PropTypes.instanceOf(ExitRecord)
    ])
  };

  splitOption(option, fragment) {
    const parts = option.split(fragment);
    return [parts[0], fragment, parts.slice(1).join(fragment)];
  }

  render() {
    const { fragment, focused, onClickItem, options, selectedItem } = this.props;
    if (!options || !options.size) return <div></div>;
    return (
      <ul style={styles.panel.global} tabIndex={1000}>
        {
          options.map((option, i) => {
            const optionSplit = this.splitOption(option.name, fragment);
            const path = option.path ? ` (${option.path})` : '';
            return <li
              key={i}
              style={{
                ...styles.item.global,
                ...(focused ? styles.item.focused : styles.item.unfocused),
                ...(option === selectedItem ? styles.itemSelected.unfocused : {})
              }}
              ref={(item) => {
                if (option === selectedItem) this.selectedItem = item;
              }}
              onClick={ () => onClickItem(option) }
            >
              <StatusEffect>{ optionSplit[0] }</StatusEffect>
              <span style={focused ? styles.selectedPart.focused : styles.selectedPart.unfocused}>
                <StatusEffect>{ optionSplit[1] }</StatusEffect>
              </span>
              <StatusEffect>{ `${optionSplit[2]}${path}` }</StatusEffect>
            </li>;
          })
        }
      </ul>
    );
  }
}

export default Autocomplete;

const styles = {
  panel: {
    global: {
      backgroundColor: '#ebf4fe',
    },
  },
  item: {
    global: {
      cursor: 'default',
      padding: '6px 8px 3px',
    },
    focused: {
      color: 'black',
    },
    unfocused: {
      color: '#5e6266',
    }
  },
  itemSelected: {
    focused: {
      backgroundColor: '#0052a4',
      color: 'white'
    },
    unfocused: {
      backgroundColor: '#a0b7c7'
    }
  },
  selectedPart: {
    focused: {
      color: 'white'
    },
    unfocused: {
      color: '#c862d0'
    }
  },
  footer: {
    backgroundColor: '#e8e8e8',
    color: 'black'
  }
};
