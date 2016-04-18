export default {
  player: '17',
  entities: {
    '1': {
      id: '1',
      components: ['container'],
      name: 'scripts',
      entities: ['2', '3']
    },
    '2': {
      id: '2',
      components: ['item'],
      name: 'rm.js',
      description: 'Remove a file'
    },
    '3': {
      id: '3',
      components: ['item'],
      description: `Scans the target system for open ports.

        > The Ares Technology Portscanner is designed for performance, but has some security and reliability concerns.`,
      name: 'portscan.js',
      quantity: 4
    },
    '4': {
      id: '4',
      components: ['container'],
      name: 'hacks',
      entities: ['5', '6']
    },
    '5': {
      id: '5',
      components: ['item'],
      name: 'portscan1.js',
    },
    '6': {
      id: '6',
      components: ['container'],
      name: 'portscans',
      entities: ['7', '8'],
    },
    '7': {
      id: '7',
      components: ['item'],
      name: 'hack.js',
      description: 'Hacks a thing',
    },
    '8': {
      id: '8',
      components: ['item'],
      name: 'hack-more.js',
    },
    '9': {
      id: '9',
      components: ['container'],
      name: 'docs',
      entities: ['10', '11']
    },
    '10': {
      id: '10',
      components: ['item'],
      name: 'readme.txt',
    },
    '11': {
      id: '11',
      components: ['item'],
      name: 'commands.txt',
    },
    '12': {
      id: '12',
      name: 'Field',
      components: ['Room'],
      description: 'This is a field. No big deal.',
      entities: ['13', '17', '18'],
      exits: ['20', '21']
    },
    '13': {
      id: '13',
      components: ['container'],
      name: 'small mailbox',
      entities: ['14']
    },
    '14': {
      id: '14',
      components: ['item'],
      name: 'leaflet.txt',
      description: 'WELCOME TO **REVERIE FORGE**!'
    },
    '17': {
      id: '17',
      components: ['player'],
      name: 'Big McLargeHuge',
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
      components: ['container'],
      name: 'usb-drive',
      entities: ['19']
    },
    '19': {
      id: '19',
      components: ['item'],
      name: 'mydoom.js',
      description: '```andy; I’m just doing my job, nothing personal, sorry,```'
    },
    '74': {
      id: '74',
      components: ['item'],
      name: 'Hiro',
      description: `Last of the freelance hackers
        Greatest sword fighter in the world
        Stringer, Central Intelligence Corporation
        Specializing in software-related intel
        (music, movies & microcode)`,
      maxHealth: 200,
      currentHealth: 200
    },
    '75': {
      id: '75',
      components: ['item'],
      name: 'Raven',
      description: 'A large man with a tattoo on his forehead which reads "Poor Impulse Control"',
      maxHealth: 400,
      currentHealth: 400
    }
  },
  availableCommands: [
    {
      name: 'take',
      parts: [
        {
          allowed: [
            {
              components: ['item'],
              owners: ['room']
            }
          ]
        }
      ]
    },
    {
      name: 'drop',
      parts: [
        {
          allowed: [
            {
              components: ['item'],
              owners: ['player']
            }
          ]
        }
      ]
    },
    {
      name: 'transfer',
      parts: [
        {
          allowed: [
            {
              components: ['item', 'container'],
              // owners: ['player', 'room']
            }
          ]
        },
        {
          allowed: [
            {
              names: ['to']
            }
          ]
        },
        {
          allowed: [
            {
              components: ['container'],
              // owners: ['player', 'room']
            }
          ]
        }
      ]
    }
  ],
  message: `# West of House

  You are standing in an open field west of a white house, with a boarded front door.

  - There is a [small mailbox](/items/13) here.
  - There is a [usb-drive](/items/18) here.

  - [Hiro](/characters/74) is here.
  - [Raven](/characters/75) is here.

  Exits:
  - [North](/exits/north)`
};
