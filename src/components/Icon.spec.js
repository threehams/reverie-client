import React from 'react';
import TestUtils from 'react-addons-test-utils';

import expect from '../__test__/configureExpect';

import Icon from './Icon';

describe('Icon', function() {
  it('adds the correct FontAwesome classes', function() {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Icon name='chevron-right' />);
    const element = renderer.getRenderOutput();
    expect(element.props.className).to.equal('fa fa-chevron-right');
  });

  context('with onClick function', function() {
    it('adds interaction styles', function() {
      const renderer = TestUtils.createRenderer();
      renderer.render(<Icon name='chevron-right' onClick={() => {}} />);
      const element = renderer.getRenderOutput();
      expect(element.props.style.cursor).to.equal('pointer');
    });
  });
});
