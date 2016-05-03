export default {
  entities: {
    '18': {
      id: '18',
      components: ['container', 'lockable', 'openable'],
      name: 'usb-drive',
      entities: ['19'],
      states: ['unlocked', 'opened'],
    },
    '19': {
      id: '19',
      components: ['item'],
      name: 'mydoom.js',
      description: '```andy; I’m just doing my job, nothing personal, sorry,```'
    },
  },
  message: 'You plug the [usb-drive](/items/18) into your head.',
};
