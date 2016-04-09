import React from 'react';
import { shallow } from 'enzyme';

import expect from '../__test__/configureExpect';

import LoadingCircle from './LoadingCircle';

describe('LoadingCircle', function() {
  context('when showUntil is false', function() {
    it('shows a loading circle', function() {
      const element = shallow(<LoadingCircle showUntil={false}><dl /></LoadingCircle>);
      expect(element.contains(<div className="loader" />)).to.be.true();
      expect(element.contains(<dl />)).to.be.false();
    });
  });

  context('when showUntil is true', function() {
    it('shows a down arrow when expanded', function() {
      const element = shallow(<LoadingCircle showUntil={true}><dl /></LoadingCircle>);
      expect(element.contains(<div className="loader" />)).to.be.false();
      expect(element.contains(<dl />)).to.be.true();
    });
  });
});
