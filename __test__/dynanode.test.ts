import Dynanode from '../src/dynanode';
import getTestConfig from '../src/getTestConfig';

let dn;
describe('dn', () => {
  beforeAll(done => {
    dn = new Dynanode(getTestConfig());
    done();
  });

  it('has a createTable function', () => {
    expect(typeof dn.createTable).toBe('function');
  });

  it('has a deleteTable function', () => {
    expect(typeof dn.deleteTable).toBe('function');
  });
});
