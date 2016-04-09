import React from 'react';
import { shallow } from 'enzyme';

import expect from '../__test__/configureExpect';

import Icon from './Icon';

describe('Icon', function() {
  it('adds the correct FontAwesome classes', function() {
    const element = shallow(<Icon name='chevron-right' />);
    expect(element.props().className).to.equal('fa fa-chevron-right');
  });

  it('applies styling with "before"', function() {
    const element = shallow(<Icon name='chevron-right' before />);
    expect(element.props().style).to.include({marginRight: 2});
  });
});
