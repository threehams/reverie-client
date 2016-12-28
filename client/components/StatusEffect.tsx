import { Set } from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../records';

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
  statusEffects: Set<string>;
}

const StatusEffectBase: React.StatelessComponent<StatusEffectProps> = ({
  children,
  statusEffects,
  ...rest,
}) => {
  if (!statusEffects.size) {
    return <span>{ children }</span>;
  }

  const panicking = statusEffects.includes('panic');
  const onFire = statusEffects.includes('fire');
  const confused = statusEffects.includes('confusion');
  const bees = statusEffects.includes('bees');
  let result: any = children;
  if (confused) {
    result = confuse(result);
  }
  if (panicking) {
    result = panic(result);
  }
  if (bees) {
    result = beeAttack(result);
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
};

function confuse(children: React.ReactNode[]): React.ReactNode[] {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return child.split(' ').map((spaced) => {
        return spaced.split('.').map((dotted) => {
          return dotted.split('-').map((dashed) => {
            return shuffle(dashed);
          }).join('-');
        }).join('.');
      }).join(' ');
    }
    return child;
  });
}

function panic(children: React.ReactNode[]): React.ReactNode[] {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return child.split(' ').map((word) => {
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

function beeAttack(children: React.ReactNode[]): React.ReactNode[] {
  return React.Children.map(children, (child: any) => {
    if (typeof child === 'string') {
      return child.split(' ').map((word) => {
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

export const StatusEffect = connect(
  (state: State) => ({
    statusEffects: state.ui.statusEffects,
  }),
  {},
)(StatusEffectBase);

const styles = {
  fire: {
    color: 'red',
  },
  panic: {
    textTransform: 'uppercase',
  },
};
