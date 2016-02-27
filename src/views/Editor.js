import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import panelStyles from '../styles/panel';
import Radium from 'radium';

export class Editor extends React.Component {
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
  width: '70%'
};

export default connect((state) => {
  return {
    log: state.get('log')
  };
})(Radium(Editor));

