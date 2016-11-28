import Dynanode from '../../src/dynanode';
import Condition from '../../src/conditions/Condition';
import getTestConfig from '../../src/getTestConfig';

let dn;
describe('attr()', () => {

  beforeAll(done => {
    dn = new Dynanode(getTestConfig());
    done();
  });

  it('creates a condition instance', () => {
    const cond = dn.attr('title');
    expect(cond).toBeInstanceOf(Condition);
  });
});
