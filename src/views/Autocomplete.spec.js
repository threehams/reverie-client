import React from 'react';
import {createStore} from 'redux';
import {Map, fromJS, List} from 'immutable';

import expect from '../__test__/configureExpect';
import sd from 'skin-deep';

import AutocompleteContainer from './Autocomplete';
import EntityRecord from '../records/entity-record';

describe('Autocomplete', function() {
  let store;

  const configureStore = (inventory) => {
    return createStore(() => {
      return Map({
        entities: inventory
      });
    });
  };

  describe('connected component', function() {
    context('executables', function() {
      beforeEach(function() {
        const inventory = fromJS({
          '1': new EntityRecord({
            id: '1',
            name: 'rm',
            executable: true
          }),
          '2': new EntityRecord({
            id: '2',
            name: 'rm-hack',
            executable: true
          })
        });
        store = configureStore(inventory);
      });

      it('matches all scripts', function() {
        const tree = sd.shallowRender( <AutocompleteContainer command="rm" />, {store });
        const element = tree.getRenderOutput();
        expect(element.props.options).to.equal(List(['rm', 'rm-hack']));
      });
    });

    context('other items', function() {
      beforeEach(function() {
        const inventory = fromJS({
          '1': new EntityRecord({
            id: '1',
            name: 'rm',
            executable: false
          })
        });
        store = configureStore(inventory);
      });

      it('does not match files', function() {
        const tree = sd.shallowRender(<AutocompleteContainer command="rm" />, {store });
        expect(tree.props.options).to.equal(List([]));
      });
    });
  });
});
