import React, { PropTypes } from 'react';
import {List} from 'immutable';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import CommandRecord from '../records/CommandRecord';
import EntityRecord from '../records/EntityRecord';
import ExitRecord from '../records/ExitRecord';

import StatusEffect from '../components/StatusEffect';

export class Autocomplete extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
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
    left: PropTypes.number,
    options: PropTypes.instanceOf(List),
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
    const { fragment, focused, options, selectedItem } = this.props;
    if (!options || !options.size) return <div></div>;
    return (
      <ul style={[styles.panel.global, focused ? styles.panel.focused : styles.panel.unfocused]}>
        {
          options.map((option, i) => {
            const optionSplit = this.splitOption(option.name, fragment);
            return <li
              key={i}
              style={[
                styles.item.global,
                focused ? styles.item.focused : styles.item.unfocused,
                option === selectedItem ? styles.itemSelected.unfocused : null
              ]}
              ref={(item) => {
                if (option === selectedItem) this.selectedItem = item;
              }}
            >
              <StatusEffect>{ optionSplit[0] }</StatusEffect>
              <span style={styles.selectedPart.unfocused}><StatusEffect>{ optionSplit[1] }</StatusEffect></span>
              <StatusEffect>{ optionSplit[2] }</StatusEffect>
              {
                option.path && <span>
                  &nbsp;(<StatusEffect>{ option.path }</StatusEffect>)
                </span>
              }
            </li>;
          })
        }
      </ul>
    );
  }
}

export default Radium(Autocomplete);

const styles = {
  panel: {
    global: {
      backgroundColor: '#ebf4fe',
    }
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
