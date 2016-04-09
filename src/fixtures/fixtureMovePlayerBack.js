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
  message: `# West of House

  You are standing in an open field west of a white house, with a boarded front door.

  - There is a [small mailbox](/item/13) here.
  - There is a [usb-drive](/item/18) here.

  - [Hiro](/character/74) is here.
  - [Raven](/character/75) is here.

  Exits:
  - [North](/exits/north)`
};
