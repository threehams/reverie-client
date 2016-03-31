export default {
  entities: {
    '12': {
      id: '12',
      name: 'West of House',
      description: 'This is an open field west of a white house, with a boarded front door.',
      entities: ['13', '17', '18'],
      exits: ['95']
    },
    '95': {
      id: '95',
      name: 'North of House',
      description: 'You are facing the north side of a white house. There is no door here, and all the windows are barred.',
      entities: [],
      exits: ['12']
    }
  },
  message: `West of House

  This is an open field west of a white house, with a boarded front door.`
};
