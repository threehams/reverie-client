import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';
import ReactMarkdown from 'react-markdown';

import * as playerActions from '../actions/playerActions';

class EditorPanel extends React.Component {
  componentDidUpdate() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    history: React.PropTypes.instanceOf(List),
    height: React.PropTypes.string
  };

  render() {
    const { height, history } = this.props;
    const marginLeft = Math.ceil(Math.ceil((history.size + 1).toString().length) * 7.5);
    const markdownProps = {
      skipHtml: true,
      className: 'markdown',
      renderers: {
        Link: MarkdownLinkContainer
      }
    };
    const items = history.map((item, index) => {
      const trimmed = item ? item.trim() : '';
      return (
        <li key={index}>
          <span style={[styles.counter, {width: marginLeft + 4}]}>{index}</span>
          { trimmed ? <ReactMarkdown source={trimmed} {...markdownProps} /> : '\u00a0' }
        </li>
      );
    });
    return (
      <div style={[styles.container, { height }]} ref={(container) => { this.container = container; } }>
        <ol style={[styles.list, { marginLeft: marginLeft + 20, minHeight: height}]}>
          { items }
        </ol>
      </div>
    );
  }
}

export default class MarkdownLink extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    href: PropTypes.string,
    title: PropTypes.string,
    move: PropTypes.func,
    attack: PropTypes.func,
    locateItem: PropTypes.func
  };

  onClick(event) {
    event.preventDefault();
    const { href } = this.props;
    const [type, id] = href.split('/').slice(1);
    switch (type) {
      case 'exits':
        return this.props.move(id);
      case 'characters':
        return this.props.attack(id);
      case 'items':
        return this.props.locateItem(id);
      default:
        throw new Error('Cannot handle type: ', type); // eslint-disable-line no-console
    }
  }

  render() {
    const { href, children } = this.props;
    return (
      <a href={href} onClick={::this.onClick}>{ children }</a>
    );
  }
}

const MarkdownLinkContainer = connect(null, {
  move: playerActions.move,
  attack: playerActions.attack,
  locateItem: playerActions.locateItem
})(MarkdownLink);

export default Radium(EditorPanel);

const styles = {
  container: {
    backgroundColor: '#f0f0f0',
    overflowY: 'auto',
    position: 'relative'
  },
  counter: {
    color: '#800000',
    cursor: 'default',
    display: 'inline-block',
    left: 0,
    position: 'absolute',
    textAlign: 'right'
  },
  list: {
    backgroundColor: 'white',
    paddingLeft: 4
  }
};
