import React from 'react';

export default class Icon extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func
  };

  render() {
    const { name, onClick } = this.props;
    return (
      <i style={Object.assign(STYLES.all, STYLES[name], onClick ? STYLES.interactive : null)} onClick={onClick}>
        { ICONS[name] }
      </i>
    );
  }
}

const STYLES = {
  all: {
    display: 'inline-block',
    height: 16,
    width: 16
  },
  plus: {
    border: '1px solid black'
  },
  minus: {
    border: '1px solid black'
  },
  interactive: {
    cursor: 'pointer'
  }
};

const ICONS = {
  plus: '+',
  minus: '-'
};
