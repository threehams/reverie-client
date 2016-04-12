export default {
  entities: [
    {
      id: '18',
      name: 'usb-drive',
      type: 'container',
      entities: [{
        id: '10',
        name: 'readme.txt',
        type: 'text'
      },
      {
        id: '19',
        name: 'mydoom.js',
        type: 'executable',
        description: 'andy; I’m just doing my job, nothing personal, sorry,'
      }]
    },
    {
      id: '9',
      name: 'docs',
      type: 'container',
      entities: [{
        id: '11',
        name: 'commands.txt',
        type: 'text'
      }]
    }
  ],
  message: 'You moved "readme.txt" to "usb-drive."'
};
