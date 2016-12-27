import ReconnectingWebSocket = require('reconnectingwebsocket');

// this is not a universal app, so 'window' is only undefined in tests
export let socket;
if (typeof window !== 'undefined') {
  socket = new ReconnectingWebSocket(`ws://${location.hostname}:${location.port}/`);
}
