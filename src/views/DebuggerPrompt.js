import React, { PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import * as commandActions from '../actions/commandActions';
import * as autocompleteActions from '../actions/autocompleteActions';
import Autocomplete from './Autocomplete';
import panelStyles from '../styles/panel';

export class DebuggerPrompt extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    autocompleteOpen: PropTypes.bool,
    autocompleteOptions: PropTypes.instanceOf(List),
    currentCommand: PropTypes.string,
    sendCommand: PropTypes.func,
    selectedAutocompleteIndex: PropTypes.number,
    selectNext: PropTypes.func,
    selectPrevious: PropTypes.func,
    setCurrentCommand: PropTypes.func,
  };

  setCommandFromInput(event) {
    const { autocompleteOpen, currentCommand, setCurrentCommand } = this.props;
    setCurrentCommand(event.target.value, !autocompleteOpen && event.target.value.length < currentCommand.length);
  }

  selectOption(event) {
    const { autocompleteOptions, selectNext, selectedAutocompleteIndex, selectPrevious } = this.props;
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectNext(autocompleteOptions, selectedAutocompleteIndex);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectPrevious(autocompleteOptions, selectedAutocompleteIndex);
    }
  }

  submit(event) {
    const { autocompleteOptions, autocompleteOpen, setCurrentCommand, currentCommand, selectedAutocompleteIndex, sendCommand} = this.props;
    event.preventDefault();
    if (autocompleteOpen) {
      const option = autocompleteOptions.get(selectedAutocompleteIndex);
      const newCommand = currentCommand.replace(new RegExp(`${currentCommand}$`), option.name);
      setCurrentCommand(newCommand, true);
    } else {
      sendCommand(currentCommand);
    }
  }

  render() {
    const { autocompleteOptions, autocompleteOpen, currentCommand, selectedAutocompleteIndex } = this.props;
    return (
      <form onSubmit={::this.submit}>
        {
          autocompleteOpen &&
            <Autocomplete command={currentCommand}
                          options={autocompleteOptions}
                          selectedIndex={selectedAutocompleteIndex} />
        }
        <input id="prompt"
               type="text"
               value={currentCommand}
               style={styles}
               onKeyDown={::this.selectOption}
               onChange={::this.setCommandFromInput} />
      </form>
    );
  }
}

const styles = {
  width: '100%',
  borderBottom: 0,
  borderLeft: 0,
  borderRight: 0,
  borderTop: panelStyles.border,
  padding: 4,
  outline: 0
};

export const mapStateToProps = (state) => {
  const currentCommand = state.getIn(['ui', 'currentCommand']);
  return {
    autocompleteOpen: state.getIn(['ui', 'autocompleteOpen']),
    currentCommand: currentCommand,
    autocompleteOptions: state.get('entities')
      .toList()
      .filter(item => item.name.includes(currentCommand) && item.type === 'executable'),
    selectedAutocompleteIndex: state.getIn(['ui', 'selectedAutocompleteIndex'])
  };
};

export default connect(mapStateToProps, {
  sendCommand: commandActions.sendCommand,
  setCurrentCommand: commandActions.setCurrentCommand,
  selectNext: autocompleteActions.selectNext,
  selectPrevious: autocompleteActions.selectPrevious,
})(Radium(DebuggerPrompt));
