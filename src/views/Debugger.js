import React from 'react';
import { connect } from 'react-redux';
import {List} from 'immutable';
import Radium from 'radium';

export class Debugger extends React.Component {
  static propTypes = {
    log: React.PropTypes.instanceOf(List)
  };

  render() {
    return (
      <div></div>
    );
  }
}

export default connect((state) => {
  return {
    log: state.get('commandLog')
  };
})(Radium(Debugger));

