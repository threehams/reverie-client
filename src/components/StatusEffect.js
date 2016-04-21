import React, { Children, PropTypes } from 'react';
import Radium from 'radium';
import { Set } from 'immutable';
import shallowCompare from 'react-addons-shallow-compare';

function shuffle(string) {
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
}

export class StatusEffect extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    children: PropTypes.node
  };

  static contextTypes = {
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
        if (word[word.length - 1] !== '.') return word;
        return word.substr(0, word.length - 1) + '!';
      }).join(' ');
    });
  }

  render() {
    console.log(this.context.statusEffects);
    const { statusEffects } = this.context;
    const panicking = statusEffects.includes('panic');
    const onFire = statusEffects.includes('fire');
    const confused = statusEffects.includes('confusion');
    let result = this.props.children;
    if (confused) {
      result = this.confuse(result);
    }
    if (panicking) {
      result = this.panic(result);
    }
    return (
      <span style={[onFire && styles.fire, panicking && styles.panic]}>{ result }</span>
    );
  }
}

export default Radium(StatusEffect);

const styles = {
  fire: {
    color: 'red'
  },
  panic: {
    textTransform: 'uppercase'
  }
};
