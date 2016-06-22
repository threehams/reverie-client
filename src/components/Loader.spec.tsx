import * as React from 'react';
import { shallow } from 'enzyme';

import { expect } from '../__test__/configureExpect';

import { Loader } from './Loader';

describe('Loader', function() {
  context('when showUntil is false', function() {
    it('shows a loading circle', function() {
      const element = shallow(<Loader showUntil={false}><dl /></Loader>);
      expect(element.contains(<div className="loader" />)).to.be.true;
      expect(element.contains(<dl />)).to.be.false;
    });
  });

  context('when showUntil is true', function() {
    it('shows a down arrow when expanded', function() {
      const element = shallow(<Loader showUntil={true}><dl /></Loader>);
      expect(element.contains(<div className="loader" />)).to.be.false;
      expect(element.contains(<dl />)).to.be.true;
    });
  });
});
