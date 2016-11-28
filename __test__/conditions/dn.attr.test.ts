import Dynanode from '../../src/dynanode';
import Condition from '../../src/conditions/Condition';

let dn;
describe('attr()', () => {

  beforeAll(done => {
    dn = new Dynanode({
      region: 'us-west-2',
      endpoint: 'http://localhost:7777'
    });
    done();
  });

  it('creates a condition instance', () => {
    const cond = dn.attr('title');
    expect(cond).toBeInstanceOf(Condition);
  });
});
