import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import * as historyActions from '../actions/history-actions';
import Autocomplete from './Autocomplete';

export class DebuggerPrompt extends React.Component {
  static propTypes = {
    sendCommand: React.PropTypes.func,
    setCurrentCommand: React.PropTypes.func,
    currentCommand: React.PropTypes.string
  };

  submit(event) {
    event.preventDefault();
    this.props.sendCommand(this.props.currentCommand);
  }

  render() {
    const { currentCommand, setCurrentCommand } = this.props;
    return (
      <form onSubmit={::this.submit}>
        { currentCommand && currentCommand.length > 1 ? <Autocomplete command={currentCommand} /> : null }
        <input type="text"
               value={currentCommand}
               style={styles}
               onChange={(event) => { setCurrentCommand(event.target.value); } } />
      </form>
    );
  }
}

const styles = {
  width: '100%',
  borderBottom: 0,
  borderLeft: 0,
  borderRight: 0,
  borderTop: '1px solid black',
  padding: 4,
  outline: 0
};

export default connect((state) => {
  return {
    currentCommand: state.getIn(['ui', 'currentCommand'])
  };
}, historyActions)(Radium(DebuggerPrompt));
