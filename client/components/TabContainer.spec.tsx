import * as React from 'react';
import { shallow } from 'enzyme';

import { expect } from '../../__test__/configureExpect';

import { TabContainer } from './TabContainer';

describe('TabContainer', function() {
  describe('equalWidth', function() {
    it('applies equalWidth styles', function() {
      // Flexbox prefixing makes this difficult to test
      const element = shallow(<TabContainer equalWidth>Stuff</TabContainer>);
      expect(element.first().prop('style').display).to.contain('flex');
    });
  });
});
