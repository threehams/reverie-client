export default {
  inventoryIds: ['3', '4', '9'],
  inventoryById: {
    '1': {
      id: '1',
      name: 'rm.js',
      type: 'script'
    },
    '2': {
      id: '2',
      name: 'portscan.js',
      type: 'script'
    },
    '3': {
      id: '3',
      name: 'scripts',
      type: 'folder',
      itemIds: ['1', '2']
    },
    '4': {
      id: '4',
      name: 'hacks',
      type: 'folder',
      itemIds: ['5', '6']
    },
    '5': {
      id: '5',
      name: 'portscan1.js',
      type: 'script'
    },
    '6': {
      id: '6',
      name: 'portscans',
      type: 'folder',
      itemIds: ['7', '8']
    },
    '7': {
      id: '7',
      name: 'hack.js',
      type: 'script'
    },
    '8': {
      id: '8',
      name: 'hack-more.js',
      type: 'script'
    },
    '9': {
      id: '9',
      name: 'docs',
      type: 'folder',
      itemIds: ['10', '11']
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
    }
  }
};
