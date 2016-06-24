import * as React from 'react';
import { shallow } from 'enzyme';

import { expect } from '../__test__/configureExpect';

import { Icon } from './Icon';

describe('Icon', function() {
  it('adds the correct classes', function() {
    const element = shallow(<Icon name="folder" />);
    expect(element.prop('className')).to.equal('folder');
  });

  it('applies styling with "before"', function() {
    const element = shallow(<Icon name="chevron-right" before />);
    expect(element.prop('style')).to.include({marginRight: 6});
  });
});
