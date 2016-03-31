/* eslint-env node */
/* eslint no-process-env:0 */

export default {
  port: process.env.PORT,
  development: process.env.NODE_ENV === 'development',
  production: process.env.NODE_ENV === 'production'
};
