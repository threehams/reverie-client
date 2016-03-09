import chai, {expect} from 'chai';
import chaiImmutable from 'chai-immutable';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';

chai.use(chaiImmutable);
chai.use(dirtyChai);
chai.use(sinonChai);

export default expect;
