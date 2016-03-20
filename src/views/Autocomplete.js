import React from 'react';
import { connect } from 'react-redux';
import {List} from 'immutable';
import Radium from 'radium';

export class Autocomplete extends React.Component {
  static propTypes = {
    options: React.PropTypes.instanceOf(List)
  };

  render() {
    const { options } = this.props;
    if (!options) return <div></div>;
    return (
      <div>
        <ul>
          { options.map((option, i) => <li key={i}>{option}</li>) }
        </ul>
      </div>
    );
  }
}

export default connect((state, props) => {
  return {
    options: state.get('entities')
      .toList()
      .filter(item => item.name.includes(props.command) && item.executable)
      .map(item => item.name)
  };
})(Radium(Autocomplete));
