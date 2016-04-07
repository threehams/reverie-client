export default {
  player: '17',
  entities: {
    '1': {
      id: '1',
      name: 'scripts',
      type: 'container',
      entities: ['2', '3']
    },
    '2': {
      id: '2',
      name: 'rm.js',
      description: 'Remove a file',
      type: 'executable'
    },
    '3': {
      id: '3',
      name: 'portscan.js',
      quantity: 4,
      type: 'executable'
    },
    '4': {
      id: '4',
      name: 'hacks',
      type: 'container',
      entities: ['5', '6']
    },
    '5': {
      id: '5',
      name: 'portscan1.js',
      type: 'executable'
    },
    '6': {
      id: '6',
      name: 'portscans',
      type: 'container',
      entities: ['7', '8']
    },
    '7': {
      id: '7',
      name: 'hack.js',
      description: 'Hacks a thing',
      type: 'executable'
    },
    '8': {
      id: '8',
      name: 'hack-more.js',
      type: 'executable'
    },
    '9': {
      id: '9',
      name: 'docs',
      type: 'container',
      entities: ['10', '11']
    },
    '10': {
      id: '10',
      name: 'readme.txt',
      type: 'text'
    },
    '11': {
      id: '11',
      name: 'commands.txt',
      type: 'text'
    },
    '12': {
      id: '12',
      name: 'Field',
      description: 'You are standing in an open field west of a white house, with a boarded front door',
      entities: ['13', '17', '18'],
      exits: ['20', '21']
    },
    '13': {
      id: '13',
      name: 'small mailbox',
      type: 'container',
      entities: ['14']
    },
    '14': {
      id: '14',
      name: 'leaflet.txt',
      description: 'WELCOME TO REVERIE FORGE!'
    },
    '17': {
      id: '17',
      name: 'Player',
      entities: ['1', '4', '9'],
      currentHealth: 100,
      currentMemory: 100,
      currentStorage: 100,
      maxHealth: 100,
      maxMemory: 100,
      maxStorage: 100
    },
    '18': {
      id: '18',
      name: 'usb-drive',
      type: 'container',
      entities: ['19']
    },
    '19': {
      id: '19',
      name: 'mydoom.js',
      type: 'executable',
      description: 'andy; I’m just doing my job, nothing personal, sorry,'
    }
  },
  message: `You are standing in an open field west of a white house, with a boarded front door.

  There is a small mailbox here.`
};
