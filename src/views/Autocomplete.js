import React, { PropTypes } from 'react';
import {List} from 'immutable';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';
import EntityRecord from '../records/EntityRecord';
import CommandRecord from '../records/CommandRecord';

export class Autocomplete extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    bottom: PropTypes.number,
    fragment: PropTypes.string,
    focused: PropTypes.bool,
    left: PropTypes.number,
    options: PropTypes.instanceOf(List),
    selectedItem: PropTypes.oneOfType([
      PropTypes.instanceOf(CommandRecord),
      PropTypes.instanceOf(EntityRecord)
    ]),
    onKeyDown: PropTypes.func
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
            >
              <span>
                { optionSplit[0] }
                <span style={styles.selectedPart.unfocused}>{ optionSplit[1] }</span>
                { optionSplit[2] }
              </span>
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
      position: 'absolute',
      bottom: 30,
      border: '1px solid #c0c0c0',
      maxHeight: '10vh',
      maxWidth: '20vw',
      backgroundColor: '#ebf4fe'
    }
  },
  item: {
    global: {
      padding: '6px 8px 3px'
    },
    focused: {
      color: 'black'
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
