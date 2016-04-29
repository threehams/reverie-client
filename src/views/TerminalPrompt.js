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
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    autocompleteFragment: PropTypes.string,
    autocompleteOpen: PropTypes.bool,
    autocompleteOptions: PropTypes.instanceOf(List),
    autocompleteSelectedItem: PropTypes.oneOfType([
      PropTypes.instanceOf(CommandRecord),
      PropTypes.instanceOf(EntityRecord),
      PropTypes.instanceOf(ExitRecord)
    ]),
    closeAutocomplete: PropTypes.func,
    completeCommand: PropTypes.func,
    currentCommand: PropTypes.string,
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

  // This does:
  // Decide, based on event, whether to select next or previous.
  // Keep here, but change. Index is unreliable.
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
  //
  // Keep 'if autocompleteOpen' conditional, move everything else into action creator.
  submit(event) {
    event.preventDefault();
    const { autocompleteOpen, autocompleteOptions, completeCommand, currentCommand, autocompleteSelectedItem, sendCommand } = this.props;
    const cursorIndex = ReactDOM.findDOMNode(this.input).selectionStart;
    if (autocompleteOpen && autocompleteOptions.size) {
      completeCommand(currentCommand, cursorIndex, autocompleteSelectedItem);
    } else {
      sendCommand(currentCommand);
    }
  }

  render() {
    const { autocompleteFragment, autocompleteOptions, autocompleteOpen, currentCommand, autocompleteSelectedItem } = this.props;
    return (
      <form onSubmit={::this.submit}>
        {
          autocompleteOpen &&
          <Autocomplete fragment={autocompleteFragment}
                        options={autocompleteOptions}
                        selectedItem={autocompleteSelectedItem}/>
        }
        <input id="prompt"
               type="text"
               ref={(input) => { this.input = input; }}
               value={currentCommand}
               style={styles.input}
               onKeyDown={::this.selectOption}
               onChange={::this.setCommandFromInput}
               autoComplete="off"/>
      </form>
    );
  }
}

const styles = {
  input: {
    width: '100%',
    borderBottom: 0,
    borderLeft: 0,
    borderRight: 0,
    borderTop: panelStyles.border,
    padding: 4,
    outline: 0,
    ...fontStyles.monospace,
  }
};

export const mapStateToProps = (state) => {
  return {
    autocompleteFragment: autocompleteSelectors.autocompleteFragment(state),
    autocompleteOpen: state.getIn(['command', 'autocompleteOpen']),
    autocompleteOptions: autocompleteSelectors.availableOptions(state),
    autocompleteSelectedItem: autocompleteSelectors.selectedOption(state),
    currentCommand: state.getIn(['command', 'current']),
  };
};

export default connect(mapStateToProps, commandActions)(Radium(TerminalPrompt));
