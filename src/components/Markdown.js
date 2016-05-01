import React, { PropTypes } from 'react';
import StatusEffect from './StatusEffect';
import shallowCompare from 'react-addons-shallow-compare';

import fontStyles from '../styles/font';
import colors from '../styles/colors';

export class MarkdownLink extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

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
    const [route, id] = href.split('/').slice(1);
    switch (route) {
      case 'exits':
        return this.props.move(id);
      case 'creatures':
        return this.props.attack(id);
      case 'items':
        return this.props.locateItem(id);
      default:
        throw new Error('Cannot handle route: ', route); // eslint-disable-line no-console
    }
  }

  render() {
    const { href, children } = this.props;
    return (
      <a href={href} onClick={::this.onClick}>{ <StatusEffect>{ children }</StatusEffect> }</a>
    );
  }
}

export class MarkdownHeading extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    children: PropTypes.node,
    level: PropTypes.number // currently unused, but could be good!
  };

  render() {
    return <StatusEffect>{ [this.props.children, <div key="underline">---------------</div>] }</StatusEffect>;
  }
}

export class MarkdownParagraph extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <StatusEffect>{ this.props.children }</StatusEffect>
    );
  }
}

export class MarkdownList extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <ul style={styles.list}>{ this.props.children }</ul>
    );
  }
}

export class MarkdownItem extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <li>
        <StatusEffect>- { this.props.children }</StatusEffect>
      </li>
    );
  }
}

export class MarkdownCode extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <code style={{...styles.all, ...styles.code}}>
        <StatusEffect>
          <span style={styles.codeMarker}>|</span> { this.props.children }
        </StatusEffect>
      </code>
    );
  }
}

export class MarkdownEmphasis extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <em style={{...styles.all, ...styles.em}}><StatusEffect>{ this.props.children }</StatusEffect></em>
    );
  }
}

export class MarkdownStrong extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <strong style={{...styles.all, ...styles.strong}}><StatusEffect>{ this.props.children }</StatusEffect></strong>
    );
  }
}

export class MarkdownBlockQuote extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <blockquote style={{...styles.all, ...styles.blockquote}}>
        <StatusEffect>"{ this.props.children }"</StatusEffect>
      </blockquote>
    );
  }
}

const styles = {
  all: {
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  blockquote: {
    color: colors.variable,
    display: 'inline-block',
    marginLeft: Math.floor(fontStyles.widths.monospace * 2)
  },
  code: {
    color: colors.string,
    display: 'inline-block',
    paddingLeft: Math.floor(fontStyles.widths.monospace * 2),
    position: 'relative'
  },
  codeMarker: {
    position: 'absolute',
    left: 0
  },
  em: {
    color: colors.variable
  },
  strong: {
    color: colors.property
  }
};
