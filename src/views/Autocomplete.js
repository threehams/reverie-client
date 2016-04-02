import React from 'react';
import { connect } from 'react-redux';
import {List} from 'immutable';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

export class Autocomplete extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    options: React.PropTypes.instanceOf(List)
  };

  render() {
    const { options } = this.props;
    if (!options) return <div></div>;
    return (
      <div style={styles} className="pork">
        <ul>
          { options.map((option, i) => <li key={i}>{option}</li>) }
        </ul>
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => {
  return {
    options: state.get('entities')
      .toList()
      .filter(item => item.name.includes(props.command) && item.type === 'executable')
      .map(item => item.name)
  };
};

export default connect(mapStateToProps)(Radium(Autocomplete));

const styles = {
  position: 'absolute'
};
