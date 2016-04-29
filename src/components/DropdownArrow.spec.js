import React from 'react';
import { shallow } from 'enzyme';

import expect from '../__test__/configureExpect';

import DropdownArrow from './DropdownArrow';
import Icon from './Icon';

describe('DropdownArrow', function() {
  it('shows a right arrow when not expanded', function() {
    const element = shallow(<DropdownArrow />);
    expect(element.find(Icon).props().name).to.equal('caret-right');
  });

  it('shows a down arrow when expanded', function() {
    const element = shallow(<DropdownArrow expanded />);
    expect(element.find(Icon).props().name).to.equal('caret-down');
  });
});