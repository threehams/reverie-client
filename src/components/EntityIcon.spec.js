import React from 'react';
import { shallow } from 'enzyme';
import { Set } from 'immutable';

import expect from '../__test__/configureExpect';

import EntityIcon, { TYPE_ICONS } from './EntityIcon';
import Icon from './Icon';
import EntityRecord from '../records/EntityRecord';

describe('Icon', function() {
  describe('locked containers', function() {
    it('shows a lock icon', function() {
      const entity = new EntityRecord({
        components: Set(['container', 'lockable']),
        states: Set(['locked'])
      });
      const element = shallow(<EntityIcon entity={entity} />);
      expect(element.find(Icon).props().name).to.equal(TYPE_ICONS.locked);
    });
  });

  describe('unlocked, closed containers', function() {
    it('shows a lock icon', function() {
      const entity = new EntityRecord({
        components: Set(['container', 'lockable']),
        states: Set(['unlocked', 'closed'])
      });
      const element = shallow(<EntityIcon entity={entity} />);
      expect(element.find(Icon).props().name).to.equal(TYPE_ICONS.unlocked);
    });
  });

  describe('lockable, open containers', function() {
    it('shows a lock icon', function() {
      const entity = new EntityRecord({
        components: Set(['container']),
        states: Set(['opened'])
      });
      const element = shallow(<EntityIcon entity={entity} />);
      expect(element.find(Icon).props().name).to.equal(TYPE_ICONS.container);
    });
  });

  describe('openable, closed containers', function() {
    it('shows a closed container icon', function() {
      const entity = new EntityRecord({
        components: Set(['container', 'openable']),
        states: Set(['closed'])
      });
      const element = shallow(<EntityIcon entity={entity} />);
      expect(element.find(Icon).props().name).to.equal(TYPE_ICONS.containerClosed);
    });
  });

  describe('openable, opened containers', function() {
    it('shows an opened container icon', function() {
      const entity = new EntityRecord({
        components: Set(['container', 'openable']),
        states: Set(['opened'])
      });
      const element = shallow(<EntityIcon entity={entity} />);
      expect(element.find(Icon).props().name).to.equal(TYPE_ICONS.container);
    });
  });

  describe('random junk', function() {
    it('shows a generic icon', function() {
      const entity = new EntityRecord({
        components: Set(['stuff'])
      });
      const element = shallow(<EntityIcon entity={entity} />);
      expect(element.find(Icon).props().name).to.equal(TYPE_ICONS.text);
    });
  });
});
