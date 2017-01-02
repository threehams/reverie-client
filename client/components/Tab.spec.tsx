import { shallow } from 'enzyme';
import * as React from 'react';

import { expect } from '../../__test__/configureExpect';

import { styles, Tab } from './Tab';

describe('Tab', () => {
  describe('active', () => {
    it('applies active styles', () => {
      const element = shallow(<Tab active>Stuff</Tab>);
      expect(element.prop('style')).to.contain(styles.active);
    });
  });

  describe('inactive', () => {
    it('applies inactive styles', () => {
      const element = shallow(<Tab>Stuff</Tab>);
      expect(element.prop('style')).to.contain(styles.inactive);
    });
  });
});
