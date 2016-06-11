import React, { Children, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Set } from 'immutable';
import shallowCompare from 'react-addons-shallow-compare';

const BEE_PHRASES = [
  'noooo not the bees!',
  'getem off me getem off me',
  'aaaaaaghghghghhh',
  'ohhh no my eyes my eyes aggggghhhh',
];

const shuffle = (string) => {
  if (string.length < 3) return string;
  const head = string[0];
  const tail = string[string.length - 1];
  const body = string.slice(1, string.length - 1).split('');
  let i = body.length;
  while (--i) {
    const j = Math.floor(Math.random() * (i + 1 ));
    const a = body[i];
    body[i] = body[j];
    body[j] = a;
  }
  return head + body.join('') + tail;
};

export class StatusEffect extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    children: PropTypes.node,
    statusEffects: PropTypes.instanceOf(Set)
  };

  confuse(children) {
    return Children.map(children, child => {
      if (typeof child !== 'string') {
        return child;
      }
      return child.split(' ').map(spaced => {
        return spaced.split('.').map(dotted => {
          return dotted.split('-').map(dashed => {
            return shuffle(dashed);
          }).join('-');
        }).join('.');
      }).join(' ');
    });
  }

  panic(children) {
    return Children.map(children, child => {
      if (typeof child !== 'string') {
        return child;
      }
      return child.split(' ').map(word => {
        if (Math.random() < 0.05) {
          return 'a'.repeat(word.length);
        }
        if (word[word.length - 1] !== '.') return word;
        return word.substr(0, word.length - 1) + '!';
      }).join(' ');
    });
  }

  bees(children) {
    return Children.map(children, child => {
      if (typeof child !== 'string') {
        return child;
      }
      return child.split(' ').map(word => {
        if (word.length < 3) return word;
        if (Math.random() < 0.1) {
          return 'b' + 'z'.repeat(word.length - 1);
        }
        if (Math.random() < 0.06) {
          return `${word} ${BEE_PHRASES[Math.floor(Math.random() * BEE_PHRASES.length)]}`;
        }
        return word;
      }).join(' ');
    });
  }

  render() {
    const { children, statusEffects, ...rest } = this.props;
    if (!statusEffects.size) return <span>{ children }</span>;

    const panicking = statusEffects.includes('panic');
    const onFire = statusEffects.includes('fire');
    const confused = statusEffects.includes('confusion');
    const bees = statusEffects.includes('bees');
    let result = children;
    if (confused) {
      result = this.confuse(result);
    }
    if (panicking) {
      result = this.panic(result);
    }
    if (bees) {
      result = this.bees(result);
    }
    return (
      <span
        { ...rest }
        style={
          Object.assign({}, onFire && styles.fire, panicking && styles.panic)
        }
      >
        { result }
      </span>
    );
  }
}

export default connect((state) => ({
  statusEffects: state.getIn(['ui', 'statusEffects'])
}))(StatusEffect);

const styles = {
  fire: {
    color: 'red'
  },
  panic: {
    textTransform: 'uppercase'
  }
};
