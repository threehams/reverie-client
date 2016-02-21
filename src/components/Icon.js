import React from 'react';

export default class Icon extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func
  };

  render() {
    const { name, onClick } = this.props;
    const style = Object.assign(
      {},
      STYLES.all,
      onClick ? STYLES.interactive : null
    );
    return (
      <i className={`fa fa-${name}`} style={style} onClick={onClick} />
    );
  }
}

const STYLES = {
  all: {
    display: 'inline-block',
    height: 16,
    width: 16
  },
  interactive: {
    cursor: 'pointer'
  }
};
