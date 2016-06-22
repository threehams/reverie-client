import * as React from 'react';
import { shallow } from 'enzyme';

import { expect } from '../__test__/configureExpect';
import * as sinon from 'sinon';

import { Tab, styles } from './Tab';
import { Icon } from './Icon';

describe('Tab', function() {
  describe('active', function() {
    it('applies active styles', function() {
      const element = shallow(<Tab active>Stuff</Tab>);
      expect(element.first().props().style).to.contain(styles.active);
    });
  });

  describe('inactive', function() {
    it('applies inactive styles', function() {
      const element = shallow(<Tab>Stuff</Tab>);
      expect(element.first().props().style).to.contain(styles.inactive);
    });
  });

  describe('click', function() {
    context('left click', function() {
      it('calls onClick', function() {
        const onClick = sinon.spy();
        const element = shallow(<Tab onClick={onClick}>Stuff</Tab>);
        const event = { button: 0 };
        element.first().props().onClick(event);
        expect(onClick).to.have.been.called;
      });
    });

    context('middle click', function() {
      it('calls onClickClose', function() {
        const onClickClose = sinon.spy();
        const element = shallow(<Tab onClickClose={onClickClose}>Stuff</Tab>);
        const event = { button: 1 };
        element.first().props().onClick(event);
        expect(onClickClose).to.have.been.called;
      });
    });
  });

  describe('click close button', function() {
    it('stops propagation and calls onClickClose', function() {
      const onClickClose = sinon.spy();
      const stopPropagation = sinon.spy();
      const element = shallow(<Tab onClickClose={onClickClose}>Stuff</Tab>);
      const event = { stopPropagation };
      element.find(Icon).props().onClick(event);
      expect(onClickClose).to.have.been.called;
      expect(stopPropagation).to.have.been.called;
    });
  });
});
