import {List} from 'immutable';
import * as React from 'react';
import shallowCompare = require('react-addons-shallow-compare');

import { Command, Entity, Exit } from '../records';

import {StatusEffect} from '../components/StatusEffect';

interface AutocompleteProps {
  fragment: string;
  focused?: boolean;
  options: List<Command | Entity | Exit>;
  onClickItem: Function;
  selectedItem: Command | Entity | Exit;
}

export class Autocomplete extends React.Component<AutocompleteProps, {}> {
  private selectedItem: any;

  public shouldComponentUpdate(nextProps: AutocompleteProps, nextState: {}) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public componentDidUpdate() {
    if (this.selectedItem) {
      this.selectedItem.scrollIntoView(false);
    }
  }

  public render() {
    const { fragment, focused, onClickItem, options, selectedItem } = this.props;
    if (!options || !options.size) {
      return <div></div>;
    }

    return (
      <ul style={styles.panel.global} tabIndex={1000}>
        {
          options.map((option, i) => {
            const optionSplit = this.splitOption(option.name, fragment);
            const path = option.path ? ` (${option.path})` : '';
            return <li
              key={i}
              style={Object.assign(
                {},
                styles.item.global,
                (focused ? styles.item.focused : styles.item.unfocused),
                (option === selectedItem ? styles.itemSelected.unfocused : {}),
              )}
              ref={(item) => {
                if (option === selectedItem) {
                  this.selectedItem = item;
                }
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

  public splitOption(option: string, fragment: string) {
    const parts = option.split(fragment);
    return [parts[0], fragment, parts.slice(1).join(fragment)];
  }
}

const styles = {
  footer: {
    backgroundColor: '#e8e8e8',
    color: 'black',
  },
  item: {
    focused: {
      color: 'black',
    },
    global: {
      cursor: 'default',
      padding: '6px 8px 3px',
    },
    unfocused: {
      color: '#5e6266',
    },
  },
  itemSelected: {
    focused: {
      backgroundColor: '#0052a4',
      color: 'white',
    },
    unfocused: {
      backgroundColor: '#a0b7c7',
    },
  },
  panel: {
    global: {
      backgroundColor: '#ebf4fe',
    },
  },
  selectedPart: {
    focused: {
      color: 'white',
    },
    unfocused: {
      color: '#c862d0',
    },
  },
};
