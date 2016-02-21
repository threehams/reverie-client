import React from 'react';

export default class Icon extends React.Component {
  static propTypes = {
    name: React.PropTypes.string
  };

  render() {
    const { name } = this.props;
    return (
      <i style={STYLES[name]}>+</i>
    );
  }
}

const STYLES = {
  plus: {
    border: '1px solid black'
  }
};
