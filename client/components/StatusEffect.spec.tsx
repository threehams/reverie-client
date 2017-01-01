import { shallow } from 'enzyme';
import { Set } from 'immutable';
import * as React from 'react';

import { expect } from '../../__test__/configureExpect';

import { StatusEffectBase } from './StatusEffect';

describe('StatusEffect', () => {
  describe('panic', () => {
    it('capitalizes and adds exclamation points', () => {
      const randomFunction = () => {
        return 1.0;
      };
      const statusEffects = Set(['panic']);
      const element = shallow(
        <StatusEffectBase statusEffects={statusEffects} random={randomFunction}>
          everything is fine.
        </StatusEffectBase>,
      );
      expect(element.text()).to.equal('everything is fine!');
      expect(element.prop('style').textTransform).to.equal('uppercase');
    });

    it('randomly replaces words with "aaaaaaa"', () => {
      let firstCall = true;
      const randomFunction = () => {
        const value = firstCall ? 0.0 : 1.0;
        firstCall = false;
        return value;
      };
      const statusEffects = Set(['panic']);
      const element = shallow(
        <StatusEffectBase statusEffects={statusEffects} random={randomFunction}>
          everything is fine.
        </StatusEffectBase>,
      );
      expect(element.text()).to.equal('aaaaaaaaaa is fine!');
    });
  });
});
