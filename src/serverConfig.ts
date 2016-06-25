/* eslint-env node */
/* eslint no-process-env:0 */

export default {
  development: process.env.NODE_ENV === 'development',
  port: process.env.PORT,
  production: process.env.NODE_ENV === 'production',
};
