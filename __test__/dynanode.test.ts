import dn from '../src/dynanode';

describe('dn', () => {
  it('has a createTable function', () => {
    expect(typeof dn.createTable).toBe('function');
  });

  it('has a deleteTable function', () => {
    expect(typeof dn.deleteTable).toBe('function');
  });
});
