import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';
import ReactMarkdown from 'react-markdown';
import {
  MarkdownLink,
  MarkdownHeading,
  MarkdownParagraph,
  MarkdownList,
  MarkdownItem,
  MarkdownCode,
  MarkdownEmphasis,
  MarkdownStrong,
  MarkdownBlockQuote,
} from '../components/Markdown';

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
        Link: MarkdownLinkContainer,
        Heading: MarkdownHeading,
        Paragraph: MarkdownParagraph,
        List: MarkdownList,
        Item: MarkdownItem,
        Code: MarkdownCode,
        Emph: MarkdownEmphasis,
        Strong: MarkdownStrong,
        BlockQuote: MarkdownBlockQuote,
      }
    };
    const items = history.map((item, index) => {
      const trimmed = item ? item.trim() : '';
      return (
        <li key={index}>
          <span style={[styles.counter, {width: marginLeft + 4}]}>{index}</span>
          { trimmed ? <ReactMarkdown source={ trimmed } {...markdownProps} /> : '\u00a0' }
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
