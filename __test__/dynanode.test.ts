import Dynaflo from '../src/';
import getTestConfig from '../src/getTestConfig';

let d;
describe('dn', () => {
  beforeAll(done => {
    d = new Dynaflo(getTestConfig());
    done();
  });

  it('has a createTable function', () => {
    expect(typeof d.createTable).toBe('function');
  });

  it('has a deleteTable function', () => {
    expect(typeof d.deleteTable).toBe('function');
  });
});
