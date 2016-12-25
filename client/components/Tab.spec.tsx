import { shallow } from 'enzyme';
import * as React from 'react';

import * as sinon from 'sinon';
import { expect } from '../../__test__/configureExpect';

import { Icon } from './Icon';
import { styles, Tab } from './Tab';

describe('Tab', () => {
  describe('active', () => {
    it('applies active styles', () => {
      const element = shallow(<Tab active>Stuff</Tab>);
      expect(element.first().prop('style')).to.contain(styles.active);
    });
  });

  describe('inactive', () => {
    it('applies inactive styles', () => {
      const element = shallow(<Tab>Stuff</Tab>);
      expect(element.first().prop('style')).to.contain(styles.inactive);
    });
  });

  describe('click', () => {
    context('left click', () => {
      it('calls onClick', () => {
        const onClick = sinon.spy();
        const element = shallow(<Tab onClick={onClick}>Stuff</Tab>);
        const event = { button: 0 };
        element.first().prop('onClick')(event);
        expect(onClick).to.have.been.called;
      });
    });

    context('middle click', () => {
      it('calls onClickClose', () => {
        const onClickClose = sinon.spy();
        const element = shallow(<Tab onClickClose={onClickClose}>Stuff</Tab>);
        const event = { button: 1 };
        element.first().prop('onClick')(event);
        expect(onClickClose).to.have.been.called;
      });
    });
  });

  describe('click close button', () => {
    it('stops propagation and calls onClickClose', () => {
      const onClickClose = sinon.spy();
      const stopPropagation = sinon.spy();
      const element = shallow(<Tab onClickClose={onClickClose}>Stuff</Tab>);
      const event = { stopPropagation };
      element.find(Icon).prop('onClick')(event);
      expect(onClickClose).to.have.been.called;
      expect(stopPropagation).to.have.been.called;
    });
  });
});
