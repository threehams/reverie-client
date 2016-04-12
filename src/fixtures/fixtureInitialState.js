export default {
  player: '17',
  location: {
    name: 'Field',
    description: 'This is a field. No big deal.',
    entities: [{
      id: '13',
      name: 'small mailbox',
      type: 'container',
      entities: ['14']
    },
    {
      id: '18',
      name: 'usb-drive',
      type: 'container',
      entities: [{
        id: '19',
        name: 'mydoom.js',
        type: 'executable',
        description: 'andy; I’m just doing my job, nothing personal, sorry,'
      }]
    }],
    exits: ['north', 'south']
  },
  entities: [
    {
      id: '1',
      name: 'scripts',
      type: 'container',
      entities: [{
        id: '2',
        name: 'rm.js',
        description: 'Remove a file',
        type: 'executable'
      },
      {
        id: '3',
        description: `Scans the target system for open ports.

        > The Ares Technology Portscanner is designed for performance, but has some security and reliability concerns.`,
        name: 'portscan.js',
        quantity: 4,
        type: 'executable'
      }]
    },
    {
      id: '4',
      name: 'hacks',
      type: 'container',
      entities: [{
        id: '5',
        name: 'portscan1.js',
        type: 'executable'
      },
      {
        id: '6',
        name: 'portscans',
        type: 'container',
        entities: ['7', '8']
      }]
    },
    {
      id: '7',
      name: 'hack.js',
      description: 'Hacks a thing',
      type: 'executable'
    },
    {
      id: '8',
      name: 'hack-more.js',
      type: 'executable'
    },
    {
      id: '9',
      name: 'docs',
      type: 'container',
      entities: [{
        id: '10',
        name: 'readme.txt',
        type: 'text'
      },
      {
        id: '11',
        name: 'commands.txt',
        type: 'text'
      }]
    },
    {
      id: '14',
      name: 'leaflet.txt',
      description: 'WELCOME TO **REVERIE FORGE**!'
    },
    {
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
    {
      id: '74',
      name: 'Hiro',
      description: `Last of the freelance hackers
        Greatest sword fighter in the world
        Stringer, Central Intelligence Corporation
        Specializing in software-related intel
        (music, movies & microcode)`,
      maxHealth: 200,
      currentHealth: 200
    },
    {
      id: '75',
      name: 'Raven',
      description: 'A large man with a tattoo on his forehead which reads "Poor Impulse Control"',
      maxHealth: 400,
      currentHealth: 400
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
