export default {
  inventoryIds: ['3', '4'],
  inventoryById: {
    '1': {
      id: '1',
      name: 'rm',
      type: 'script'
    },
    '2': {
      id: '2',
      name: 'portscan',
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
      name: 'portscan1',
      type: 'script'
    },
    '6': {
      id: '6',
      name: 'portscan2',
      type: 'script',
      itemIds: ['7', '8']
    },
    '7': {
      id: '7',
      name: 'hack',
      type: 'script'
    },
    '8': {
      id: '8',
      name: 'more-hacks',
      type: 'script'
    }
  }
};
