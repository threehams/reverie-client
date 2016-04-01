/* This is available through webpack.config.js */
/* eslint no-process-env:0 */
let socket;
if (typeof window !== 'undefined') {
  socket = new WebSocket(`ws://${location.hostname}:${location.port}/`);
}
export default socket;
