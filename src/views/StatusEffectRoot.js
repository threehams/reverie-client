import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Set } from 'immutable';

export class StatusEffectRoot extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    statusEffects: PropTypes.instanceOf(Set)
  };

  static childContextTypes = {
    statusEffects: PropTypes.instanceOf(Set)
  };

  getChildContext() {
    console.log('getting');
    return {
      statusEffects: this.props.statusEffects
    };
  }

  render() {
    return this.props.children;
  }
}

export default connect(state => {
  return {
    statusEffects: state.getIn(['ui', 'statusEffects'])
  };
})(StatusEffectRoot);
