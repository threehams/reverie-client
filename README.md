![CircleCI](https://circleci.com/gh/threehams/reverie-client.svg?style=shield&circle-token=c21eda31e510b83c244f77f5d2e166faf12458c3)

# reverie-client
Client side for Reverie
 
# Development

Install node.js, probably v4. Best done with NVM (node version manager).
[NVM for Windows](https://github.com/coreybutler/nvm-windows)
[NVM for everything else](https://github.com/creationix/nvm)

`nvm use 6.2.2` (or 4.3.1 for not-so-bleeding-edge)

`npm install` to install all dependencies
`npm start` to start a dev server at <http://localhost:8080/>
`npm test` or `npm run test:watch` to run tests

Supports all evergreen browsers, plus IE10 + 11.

# Continuous Integration

Tests are run on CircleCI for all branches, and notify Github on
pending / success / failure. Results appear on pull requests.
