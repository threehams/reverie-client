import {Map} from 'immutable';

export default function rootReducer(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return state;
    default:
      return state;
  }
}
g
