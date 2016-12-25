import { shallow } from 'enzyme';
import * as React from 'react';

import { expect } from '../../__test__/configureExpect';

import { Icon } from './Icon';

describe('Icon', () => {
  it('adds the correct classes', () => {
    const element = shallow(<Icon name="folder" />);
    expect(element.prop('className')).to.equal('folder');
  });

  it('applies styling with "before"', () => {
    const element = shallow(<Icon name="chevron-right" before />);
    expect(element.prop('style')).to.include({marginRight: 6});
  });
});
