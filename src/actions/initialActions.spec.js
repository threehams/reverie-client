import { List, Map } from 'immutable';
import expect from '../__test__/configureExpect';

import { SET_STATE } from './actionTypes';
import * as initialActions from './initialActions';
import EntityRecord from '../records/entityRecord';
import LocationRecord from '../records/locationRecord';

describe('initialActions', function() {
  describe('setState', function() {
    it('transforms the server request', async function() {
      const payload = {
        player: '17',
        location: {
          name: 'Floor',
          entities: [
            {
              id: '19',
              name: 'usb-drive'
            }
          ]
        },
        entities: [
          {
            id: '17',
            name: 'Player',
            entities: [{
              id: '18',
              name: 'Bag'
            }]
          }
        ],
        message: 'You got a bag!'
      };
      expect(initialActions.setState({ payload: payload })).to.eql({
        type: SET_STATE,
        payload: {
          player: '17',
          location: new LocationRecord({
            name: 'Floor',
            entities: List(['19'])
          }),
          entities: Map({
            '17': new EntityRecord({
              id: '17',
              name: 'Player',
              entities: List(['18'])
            }),
            '18': new EntityRecord({
              id: '18',
              name: 'Bag'
            }),
            '19': new EntityRecord({
              id: '19',
              name: 'usb-drive'
            })
          }),
          entitiesToRemove: List(),
          message: 'You got a bag!'
        }
      });
    });
  });
});
