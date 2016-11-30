import Fluent from '../../src/fluent';
import Condition from '../../src/conditions/Condition';
import getTestConfig from '../../src/getTestConfig';

let f;
describe('attr()', () => {

  beforeAll(done => {
    f = new Fluent(getTestConfig());
    done();
  });

  it('creates a condition instance', () => {
    const cond = f.attr('title');
    expect(cond).toBeInstanceOf(Condition);
  });
});
