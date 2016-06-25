import * as React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import Radium = require('radium');
import shallowCompare = require('react-addons-shallow-compare');
import ReactMarkdown = require('react-markdown');
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
} from '../views/Markdown';

import * as playerActions from '../actions/playerActions';

interface EditorPanelProps {
  history: List<string>;
}

@Radium
export class EditorPanel extends React.Component<EditorPanelProps, {}> {
  private container: any;

  public componentDidUpdate() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  public shouldComponentUpdate(nextProps: EditorPanelProps, nextState: {}) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { history } = this.props;
    const marginLeft = Math.ceil(Math.ceil((history.size + 1).toString().length) * 7.5);
    const markdownProps = {
      className: 'markdown',
      renderers: {
        BlockQuote: MarkdownBlockQuote,
        Code: MarkdownCode,
        Emph: MarkdownEmphasis,
        Heading: MarkdownHeading,
        Item: MarkdownItem,
        Link: MarkdownLinkContainer,
        List: MarkdownList,
        Paragraph: MarkdownParagraph,
        Strong: MarkdownStrong,
      },
      skipHtml: true,
    };
    const items = history.map((item, index) => {
      const trimmed = item ? item.trim() : '';
      return (
        <li key={index} style={styles.item}>
          <span style={[styles.counter, {width: marginLeft + 4}]}>{index}</span>
          { trimmed ? <ReactMarkdown source={ trimmed } {...markdownProps} /> : '\u00a0' }
        </li>
      );
    });
    return (
      <div style={[styles.container]} ref={(container) => { this.container = container; } }>
        <ol style={[styles.list, { marginLeft: marginLeft + 20 }]}>
          { items }
        </ol>
      </div>
    );
  }
}

const MarkdownLinkContainer = connect(null, {
  attack: playerActions.attack,
  locateItem: playerActions.locateItem,
  move: playerActions.move,
})(MarkdownLink);

const styles = {
  container: {
    backgroundColor: '#f0f0f0',
    display: 'flex',
    flex: '1 1 auto',
    flexFlow: 'row nowrap',
    overflowY: 'auto',
    position: 'relative',
  },
  counter: {
    color: '#800000',
    cursor: 'default',
    display: 'inline-block',
    left: 0,
    position: 'absolute',
    textAlign: 'right',
  },
  item: {
    backgroundColor: 'white',
    paddingLeft: 4,
  },
  list: {
    backgroundColor: 'white',
    flex: '1 1 auto',
  },
};
