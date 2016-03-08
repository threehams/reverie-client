import {createStore, applyMiddleware} from 'redux';
import {fromJS} from 'immutable';
import promiseMiddleware from 'redux-promise-middleware';
import nock from 'nock';

import expect from '../__test__/configureExpect';
import * as inventoryActions from './inventory-actions';

describe('inventoryActions', function() {
  let _store;

  beforeEach(function() {
    nock.disableNetConnect();
    _store = createStore(
      (state, action) => { return state.concat(action); },
      [],
      applyMiddleware(promiseMiddleware())
    );
  });
  describe('fetch', function() {
    beforeEach(function() {
      nock('http://localhost:80').get('/api/inventory.json').reply(200, {
        player: {
          location: '1',
          entities: ['2']
        },
        entities: [
          {
            id: '1'
          },
          {
            id: '2'
          }
        ]
      });
    });
    it('transforms the server request', async function(done) {
      _store.subscribe(() => {
        const state = _store.getState();
        if (state.length === 3) {
          // break out of promise handler :(
          setTimeout(() => {
            expect(state[1]).to.eql({
              type: 'ENTITY_FETCH_PENDING'
            });
            expect(state[2].type).to.equal('ENTITY_FETCH_FULFILLED');
            expect(state[2].payload).to.equal(fromJS({
              location: '1',
              inventoryIds: ['2'],
              entityById: {
                '1': { id: '1'},
                '2': { id: '2'}
              }
            }));
            done();
          });
        }
      });
      _store.dispatch(inventoryActions.fetch());
    });
  });
});
