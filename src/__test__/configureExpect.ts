import * as chai from 'chai';
import * as chaiImmutable from 'chai-immutable';
import * as dirtyChai from 'dirty-chai';
import * as sinonChai from 'sinon-chai';

chai.use(chaiImmutable);
chai.use(dirtyChai);
chai.use(sinonChai);
chai.config.truncateThreshold = 0;

export { expect } from 'chai';
