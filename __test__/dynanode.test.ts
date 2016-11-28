import Dynanode from '../src/dynanode';

let dn;
describe('dn', () => {
  beforeAll(done => {
    dn = new Dynanode({
      region: 'us-west-2',
      endpoint: 'http://localhost:7777'
    });
    done();
  });

  it('has a createTable function', () => {
    expect(typeof dn.createTable).toBe('function');
  });

  it('has a deleteTable function', () => {
    expect(typeof dn.deleteTable).toBe('function');
  });
});
