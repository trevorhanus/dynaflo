import Fluent from '../src/fluent';
import getTestConfig from '../src/getTestConfig';

let f;
describe('dn', () => {
  beforeAll(done => {
    f = new Fluent(getTestConfig());
    done();
  });

  it('has a createTable function', () => {
    expect(typeof f.createTable).toBe('function');
  });

  it('has a deleteTable function', () => {
    expect(typeof f.deleteTable).toBe('function');
  });
});
