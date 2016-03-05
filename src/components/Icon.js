import React from 'react';

export default class Icon extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    before: React.PropTypes.bool
  };

  render() {
    const { name, onClick, before } = this.props;
    const style = Object.assign(
      {},
      styles.all,
      before ? styles.before : null,
      onClick ? styles.interactive : null
    );
    return (
      <i className={`fa fa-${name}`} style={style} onClick={onClick} />
    );
  }
}

const styles = {
  all: {
    display: 'inline-block',
    height: 16,
    width: 16
  },
  before: {
    marginRight: 2
  },
  interactive: {
    cursor: 'pointer'
  }
};
