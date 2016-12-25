import { shallow } from 'enzyme';
import { Set } from 'immutable';
import * as React from 'react';

import { expect } from '../../__test__/configureExpect';

import { EntityIcon, TYPE_ICONS } from './EntityIcon';
import { Icon } from './Icon';

describe('Icon', () => {
  describe('locked containers', () => {
    it('shows a lock icon', () => {
      const components = Set(['container', 'lockable']);
      const states = Set(['locked']);
      const element = shallow(<EntityIcon components={components} states={states} />);
      expect(element.find(Icon).prop('name')).to.equal(TYPE_ICONS.locked);
    });
  });

  describe('unlocked, closed containers', () => {
    it('shows a lock icon', () => {
      const components = Set(['container', 'lockable']);
      const states = Set(['unlocked', 'closed']);
      const element = shallow(<EntityIcon components={components} states={states} />);
      expect(element.find(Icon).prop('name')).to.equal(TYPE_ICONS.unlocked);
    });
  });

  describe('lockable, open containers', () => {
    it('shows a lock icon', () => {
      const components = Set(['container']);
      const states = Set(['opened']);
      const element = shallow(<EntityIcon components={components} states={states} />);
      expect(element.find(Icon).prop('name')).to.equal(TYPE_ICONS.container);
    });
  });

  describe('openable, closed containers', () => {
    it('shows a closed container icon', () => {
      const components = Set(['container', 'openable']);
      const states = Set(['closed']);
      const element = shallow(<EntityIcon components={components} states={states} />);
      expect(element.find(Icon).prop('name')).to.equal(TYPE_ICONS.containerClosed);
    });
  });

  describe('openable, opened containers', () => {
    it('shows an opened container icon', () => {
      const components = Set(['container', 'openable']);
      const states = Set(['opened']);
      const element = shallow(<EntityIcon components={components} states={states} />);
      expect(element.find(Icon).prop('name')).to.equal(TYPE_ICONS.container);
    });
  });

  describe('random junk', () => {
    it('shows a generic icon', () => {
      const components = Set(['stuff']);
      const element = shallow(<EntityIcon components={components} />);
      expect(element.find(Icon).prop('name')).to.equal(TYPE_ICONS.text);
    });
  });
});
