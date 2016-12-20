import d from './dynaflo_test_instance'; 

describe('dn', () => {

  it('has a createTable function', () => {
    expect(typeof d.createTable).toBe('function');
  });

  it('has a deleteTable function', () => {
    expect(typeof d.deleteTable).toBe('function');
  });
});
