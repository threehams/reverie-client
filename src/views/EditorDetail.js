import React from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import LoadingCircle from '../components/LoadingCircle';
import EntityRecord from '../records/entity-record';

import panelStyles from '../styles/panel';

class EditorDetail extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  static propTypes = {
    item: React.PropTypes.instanceOf(EntityRecord),
    height: React.PropTypes.string
  };

  render() {
    const { height, item } = this.props;
    if (!item) return <LoadingCircle />;
    return (
      <div style={[styles.container, {height}]} ref={(container) => { this.container = container; } }>
        <h1>{ item.name }</h1>
        <span>{ item.description }</span>
      </div>
    );
  }
}

export default Radium(EditorDetail);

const styles = {
  container: {
    overflowY: 'scroll',
    padding: panelStyles.padding
  }
};
