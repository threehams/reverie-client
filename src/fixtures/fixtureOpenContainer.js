export default {
  entities: {
    '13': {
      id: '13',
      components: ['container', 'openable'],
      name: 'small-mailbox',
      entities: ['14'],
      states: ['opened'],
    },
    '14': {
      id: '14',
      components: ['item'],
      name: 'leaflet.txt',
      description: 'WELCOME TO **REVERIE FORGE**!',
    },
  },
  message: 'You open the [mailbox](/items/13).',
};
