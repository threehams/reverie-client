import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Set } from 'immutable';

const BEE_PHRASES = [
  'noooo not the bees!',
  'getem off me getem off me',
  'aaaaaaghghghghhh',
  'ohhh no my eyes my eyes aggggghhhh',
];

const shuffle = (phrase: string) => {
  if (phrase.length < 3) {
    return phrase;
  }
  const head = phrase[0];
  const tail = phrase[phrase.length - 1];
  const body = phrase.slice(1, phrase.length - 1).split('');
  let i = body.length;
  while (--i) {
    const j = Math.floor(Math.random() * (i + 1 ));
    const a = body[i];
    body[i] = body[j];
    body[j] = a;
  }
  return head + body.join('') + tail;
};

interface StatusEffectProps {
  statusEffects?: Set<string>;
}

class StatusEffect extends React.Component<StatusEffectProps, {}> {
  public render() {
    const { children, statusEffects } = this.props;
    const rest = _.omit(this.props, ['children', 'statusEffects']);
    if (!statusEffects.size) {
      return <span>{ children }</span>;
    }

    const panicking = statusEffects.includes('panic');
    const onFire = statusEffects.includes('fire');
    const confused = statusEffects.includes('confusion');
    const bees = statusEffects.includes('bees');
    let result: any = children;
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

  private confuse(children: Array<React.ReactNode>): Array<React.ReactNode> {
    return React.Children.map(children, (child) => {
      if (typeof child === 'string') {
        return child.split(' ').map(spaced => {
          return spaced.split('.').map(dotted => {
            return dotted.split('-').map(dashed => {
              return shuffle(dashed);
            }).join('-');
          }).join('.');
        }).join(' ');
      }
      return child;
    });
  }

  private panic(children: Array<React.ReactNode>): Array<React.ReactNode> {
    return React.Children.map(children, (child) => {
      if (typeof child === 'string') {
        return child.split(' ').map(word => {
          if (Math.random() < 0.05) {
            return 'a'.repeat(word.length);
          }
          if (word[word.length - 1] !== '.') {
            return word;
          }
          return word.substr(0, word.length - 1) + '!';
        }).join(' ');
      }
      return child;
    });
  }

  private bees(children: Array<React.ReactNode>): Array<React.ReactNode> {
    return React.Children.map(children, (child: any) => {
      if (typeof child === 'string') {
        return child.split(' ').map(word => {
          if (word.length < 3) {
            return word;
          }
          if (Math.random() < 0.1) {
            return 'b' + 'z'.repeat(word.length - 1);
          }
          if (Math.random() < 0.06) {
            return `${word} ${BEE_PHRASES[Math.floor(Math.random() * BEE_PHRASES.length)]}`;
          }
          return word;
        }).join(' ');
      }
      return child;
    });
  }
}

export default connect((state) => ({
  statusEffects: state.getIn(['ui', 'statusEffects']),
}))(StatusEffect);

const styles = {
  fire: {
    color: 'red',
  },
  panic: {
    textTransform: 'uppercase',
  },
};
