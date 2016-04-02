/* This is available through webpack.config.js */
/* eslint no-process-env:0 */

// this is not a universal app, so 'window' is only undefined in tests
let socket;
if (typeof window !== 'undefined') {
  socket = new WebSocket(`ws://${location.hostname}:${location.port}/`);
}
export default socket;
