export default {
  player: '17',
  location: {
    name: 'Field',
    description: 'This is a field. No big deal.',
    entities: ['13', '18'],
    exits: ['north']
  },
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
    '13': {
      id: '13',
      components: ['container'],
      name: 'small-mailbox',
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
      components: ['creature'],
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
      components: ['creature'],
      name: 'Raven',
      description: 'A large man with a tattoo on his forehead which reads "Poor Impulse Control"',
      maxHealth: 400,
      currentHealth: 400
    },
    '76': {
      id: '76',
      components: ['creature'],
      name: 'Bees',
      description: 'A large swarm of bees. They seem uninterested in your presence.',
      maxHealth: 40,
      currentHealth: 40
    },
  },
  availableCommands: [
    {
      name: 'take',
      parts: [
        {
          allowed: [
            {
              components: ['item', 'container'],
              owners: ['floor']
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
              components: ['item', 'container'],
              owners: ['self']
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
              owners: ['self', 'floor']
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
              owners: ['self', 'floor']
            }
          ]
        }
      ]
    },
    {
      name: 'move',
      parts: [
        {
          allowed: [
            {
              components: ['item', 'container'],
              owners: ['self', 'floor']
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
              owners: ['self', 'floor']
            }
          ]
        }
      ]
    },
    {
      name: 'say'
    },
    {
      name: 'help'
    },
    {
      name: 'look',
      parts: [
        {
          allowed: [
            {
              types: ['entity'],
              owners: ['self', 'floor']
            },
            {
              types: ['exit']
            }
          ]
        }
      ]
    },
    {
      name: 'tell',
      parts: [
        {
          allowed: [
            {
              types: ['entity'],
              components: ['creature', 'player']
            }
          ]
        }
      ]
    },
    {
      name: 'attack',
      parts: [
        {
          allowed: [
            {
              types: ['entity'],
              components: ['creature', 'player']
            }
          ]
        }
      ]
    },
    {
      name: 'kill',
      parts: [
        {
          allowed: [
            {
              types: ['entity'],
              components: ['creature', 'player']
            }
          ]
        }
      ]
    },
  ],
  message: `# West of House

  You are standing in an open field west of a white house, with a boarded front door.

  - There is a [small-mailbox](/items/13) here.
  - There is a [usb-drive](/items/18) here.

  - [Hiro](/creatures/74) is here.
  - [Raven](/creatures/75) is here.
  - A swarm of [Bees](/creatures/76) is here.

  Exits:
  - [North](/exits/north)`,
};
