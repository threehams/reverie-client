import * as React from 'react';
import { shallow } from 'enzyme';

import { expect } from '../../__test__/configureExpect';

import { DropdownArrow, Icon } from './';

describe('DropdownArrow', function() {
  it('shows a right arrow when not expanded', function() {
    const element = shallow(<DropdownArrow />);
    expect(element.find(Icon).prop('name')).to.equal('icon-arrow-right');
  });

  it('shows a down arrow when expanded', function() {
    const element = shallow(<DropdownArrow expanded />);
    expect(element.find(Icon).prop('name')).to.equal('icon-arrow-down');
  });
});
