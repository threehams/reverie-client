export default {
  entities: {
    '1': {
      id: '1',
      name: 'scripts',
      components: ['container'],
      entities: ['3']
    },
    '17': {
      id: '17',
      components: ['player'],
      name: 'Big McLargeHuge',
      location: '12',
      entities: ['1', '4', '9']
    }
  },
  entitiesToRemove: ['2', '35', '36'],
  message: `The [tmp](/items/35) folder contained ransomware! You've lost the following:

  - [rm.js](/items/2)
  - [tmp](/items/35)
  - [scratch.txt](/items/36)`
};
