import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { List } from 'immutable';
import { connect } from 'react-redux';
import Radium = require('radium');

import * as autocompleteSelectors from '../selectors/autocompleteSelectors';
import * as commandActions from '../actions/commandActions';
import { Autocomplete } from './Autocomplete';
import panelStyles from '../styles/panel';
import { Command, Entity, Exit, State } from '../records';

import fontStyles from '../styles/font';

interface TerminalPromptProps {
  autocompleteFragment: string;
  autocompleteOpen: boolean;
  autocompleteOptions: List<Command | Entity | Exit>;
  autocompletePosition: number;
  autocompleteSelectedItem: Command | Entity | Exit;
  closeAutocomplete: Function;
  completeCommand: Function;
  currentCommand: string;
  selectAutocompleteItem: Function;
  selectNextAutocompleteItem: Function;
  selectPreviousAutocompleteItem: Function;
  sendCommand: Function;
  setCurrentCommand: Function;
}

@Radium
export class TerminalPrompt extends React.Component<TerminalPromptProps, {}> {
  private input: any;

  public render() {
    const {
      autocompleteFragment,
      autocompleteOptions,
      autocompleteOpen,
      autocompletePosition,
      autocompleteSelectedItem,
      currentCommand,
      selectAutocompleteItem,
    } = this.props;

    const autocompleteStyles = {
      bottom: 30,
      left: Math.floor(autocompletePosition * fontStyles.widths.monospace),
    };
    return (
      <form onSubmit={this.submit.bind(this)}>
        {
          autocompleteOpen &&
            <div style={[styles.autocompleteContainer, autocompleteStyles]}>
              <Autocomplete fragment={autocompleteFragment}
                            options={autocompleteOptions}
                            selectedItem={autocompleteSelectedItem}
                            onClickItem={selectAutocompleteItem} />
            </div>
        }
        <input id="prompt"
               type="text"
               ref={(input) => { this.input = input; }}
               value={currentCommand}
               style={styles.input}
               onKeyDown={this.selectOption.bind(this)}
               onChange={this.setCommandFromInput.bind(this)}
               autoComplete="off" />
      </form>
    );
  }

  // This does:
  private setCommandFromInput(event) {
    event.preventDefault();
    const cursorIndex: number = ReactDOM.findDOMNode<HTMLInputElement>(this.input).selectionStart;
    this.props.setCurrentCommand(event.target.value, cursorIndex);
  }

  // Intercept specific keystrokes and add special handling for autocomplete, or override browser defaults.
  private selectOption(event: React.KeyboardEvent) {
    const {
      autocompleteOptions,
      selectNextAutocompleteItem,
      autocompleteSelectedItem,
      selectPreviousAutocompleteItem,
      closeAutocomplete,
    } = this.props;
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectPreviousAutocompleteItem(autocompleteOptions, autocompleteSelectedItem);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectNextAutocompleteItem(autocompleteOptions, autocompleteSelectedItem);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeAutocomplete();
    }
  }

  // This does:
  // Based on current autocomplete open state:
  // - Open:   Based on the current command, fill in the command fragment with the selected autocomplete option.
  // - Closed: Send the command to the server.
  private submit(event: React.SyntheticEvent) {
    event.preventDefault();
    const {
      autocompleteOpen,
      autocompleteOptions,
      completeCommand,
      currentCommand,
      autocompleteSelectedItem,
      sendCommand,
    } = this.props;
    const cursorIndex = ReactDOM.findDOMNode<HTMLInputElement>(this.input).selectionStart;
    if (autocompleteOpen && autocompleteOptions.size) {
      completeCommand(currentCommand, cursorIndex, autocompleteSelectedItem);
    } else {
      sendCommand(currentCommand);
    }
  }
}

const styles = {
  autocompleteContainer: {
    border: '1px solid #c0c0c0',
    maxHeight: 300,
    maxWidth: '70vw',
    overflowY: 'scroll',
    position: 'absolute',
    zIndex: 2,
  },
  input: Object.assign(
    {
      borderBottom: 0,
      borderLeft: 0,
      borderRight: 0,
      borderTop: panelStyles.border,
      outline: 0,
      padding: 4,
      width: '100%',
    },
    fontStyles.monospace
  ),
};

export default connect((state: State) => ({
  autocompleteFragment: autocompleteSelectors.autocompleteFragment(state),
  autocompleteOpen: state.command.autocompleteOpen,
  autocompleteOptions: autocompleteSelectors.availableOptions(state),
  autocompletePosition: state.command.autocompletePosition,
  autocompleteSelectedItem: autocompleteSelectors.selectedOption(state),
  currentCommand: state.command.current,
}), commandActions)(TerminalPrompt);
