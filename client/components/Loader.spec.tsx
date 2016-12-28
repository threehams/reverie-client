import { shallow } from 'enzyme';
import * as React from 'react';

import { expect } from '../../__test__/configureExpect';

import { Loader } from './Loader';

describe('Loader', () => {
  context('when showUntil is false', () => {
    it('shows a loading circle', () => {
      const element = shallow(<Loader showUntil={false}><dl /></Loader>);
      expect(element.contains(<div className="loader" />)).to.be.true;
      expect(element.contains(<dl />)).to.be.false;
    });
  });

  context('when showUntil is true', () => {
    it('shows a down arrow when expanded', () => {
      const element = shallow(<Loader showUntil={true}><dl /></Loader>);
      expect(element.contains(<div className="loader" />)).to.be.false;
      expect(element.contains(<dl />)).to.be.true;
    });
  });
});
