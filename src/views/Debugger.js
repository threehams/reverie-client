import React from 'react';
import { connect } from 'react-redux';
import {List} from 'immutable';
import panelStyles from '../styles/panel';
import Radium from 'radium';

export class Debugger extends React.Component {
  static propTypes = {
    log: React.PropTypes.instanceOf(List)
  };

  render() {
    return (
      <div style={[panelStyles, styles]}></div>
    );
  }
}

const styles = {
  width: '70%',
  minHeight: 100
};

export default connect((state) => {
  return {
    log: state.get('commandLog')
  };
})(Radium(Debugger));

