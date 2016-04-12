import {Map, List} from 'immutable';
import expect from '../__test__/configureExpect';

import entitiesReducer from './entitiesReducer';
import EntityRecord from '../records/entityRecord';
import { SET_STATE } from '../actions/actionTypes';

describe('entitiesReducer', function() {
  describe('SET_STATE', function() {
    it('replaces existing records', function() {
      const initial = Map({
        '1': new EntityRecord({
          id: '1',
          name: 'old thing',
          entities: List(['1', '2'])
        })
      });
      const action = {
        type: SET_STATE,
        payload: {
          entities: Map({
            '1': new EntityRecord({
              id: '1',
              name: 'new thing',
              entities: List(['2'])
            })
          }),
          entitiesToRemove: List()
        }
      };
      expect(entitiesReducer(initial, action)).to.equal(
        Map({
          '1': new EntityRecord({
            id: '1',
            name: 'new thing',
            entities: List(['2'])
          })
        })
      );
    });

    it('removes records which are marked for deletion', function() {
      const initial = Map({
        '1': new EntityRecord({
          id: '1'
        }),
        '2': new EntityRecord({
          id: '2'
        })
      });
      const action = {
        type: SET_STATE,
        payload: {
          entities: Map(),
          entitiesToRemove: List(['1'])
        }
      };
      expect(entitiesReducer(initial, action)).to.equal(
        Map({ '2': new EntityRecord({
          id: '2'
        })})
      );
    });
  });
});
