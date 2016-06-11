import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { List } from 'immutable';
import { connect } from 'react-redux';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import * as autocompleteSelectors from '../selectors/autocompleteSelectors';
import * as commandActions from '../actions/commandActions';
import Autocomplete from './Autocomplete';
import panelStyles from '../styles/panel';
import CommandRecord from '../records/CommandRecord';
import EntityRecord from '../records/EntityRecord';
import ExitRecord from '../records/ExitRecord';

import fontStyles from '../styles/font';

export class TerminalPrompt extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    autocompleteFragment: PropTypes.string,
    autocompleteOpen: PropTypes.bool,
    autocompleteOptions: PropTypes.instanceOf(List),
    autocompletePosition: PropTypes.number,
    autocompleteSelectedItem: PropTypes.oneOfType([
      PropTypes.instanceOf(CommandRecord),
      PropTypes.instanceOf(EntityRecord),
      PropTypes.instanceOf(ExitRecord)
    ]),
    closeAutocomplete: PropTypes.func,
    completeCommand: PropTypes.func,
    currentCommand: PropTypes.string,
    selectAutocompleteItem: PropTypes.func,
    selectNextAutocompleteItem: PropTypes.func,
    selectPreviousAutocompleteItem: PropTypes.func,
    sendCommand: PropTypes.func,
    setCurrentCommand: PropTypes.func,
  };

  // This does:
  setCommandFromInput(event) {
    event.preventDefault();
    const cursorIndex = ReactDOM.findDOMNode(this.input).selectionStart;
    this.props.setCurrentCommand(event.target.value, cursorIndex);
  }

  // Intercept specific keystrokes and add special handling for autocomplete, or override browser defaults.
  selectOption(event) {
    const {
      autocompleteOptions,
      selectNextAutocompleteItem,
      autocompleteSelectedItem,
      selectPreviousAutocompleteItem,
      closeAutocomplete
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
  submit(event) {
    event.preventDefault();
    const {
      autocompleteOpen,
      autocompleteOptions,
      completeCommand,
      currentCommand,
      autocompleteSelectedItem,
      sendCommand
    } = this.props;
    const cursorIndex = ReactDOM.findDOMNode(this.input).selectionStart;
    if (autocompleteOpen && autocompleteOptions.size) {
      completeCommand(currentCommand, cursorIndex, autocompleteSelectedItem);
    } else {
      sendCommand(currentCommand);
    }
  }

  render() {
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
      left: Math.floor(autocompletePosition * fontStyles.widths.monospace)
    };
    return (
      <form onSubmit={this.submit.bind(this)}>
        {
          autocompleteOpen &&
            <div style={[styles.autocompleteContainer, autocompleteStyles]}>
              <Autocomplete fragment={autocompleteFragment}
                            options={autocompleteOptions}
                            selectedItem={autocompleteSelectedItem}
                            autocompletePosition={autocompletePosition}
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
}

const styles = {
  input: Object.assign(
    {
      borderBottom: 0,
      borderLeft: 0,
      borderRight: 0,
      borderTop: panelStyles.border,
      outline: 0,
      padding: 4,
      width: '100%'
    },
    fontStyles.monospace
  ),
  autocompleteContainer: {
    border: '1px solid #c0c0c0',
    maxHeight: 300,
    maxWidth: '70vw',
    overflowY: 'scroll',
    position: 'absolute',
    zIndex: 2,
  }
};

export default connect((state) => ({
  autocompleteFragment: autocompleteSelectors.autocompleteFragment(state),
  autocompleteOpen: state.getIn(['command', 'autocompleteOpen']),
  autocompleteOptions: autocompleteSelectors.availableOptions(state),
  autocompletePosition: state.getIn(['command', 'autocompletePosition']),
  autocompleteSelectedItem: autocompleteSelectors.selectedOption(state),
  currentCommand: state.getIn(['command', 'current']),
}), commandActions)(Radium(TerminalPrompt));
