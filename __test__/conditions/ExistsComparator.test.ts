import ExistsComparator from '../../src/conditions/ExistsComparator';

describe('ExistsComparator', () => {
  it('Works', () => {
    const comp = new ExistsComparator();
    expect(comp.str('#test')).toBe('attribute_exists(#test)');
  });
});
