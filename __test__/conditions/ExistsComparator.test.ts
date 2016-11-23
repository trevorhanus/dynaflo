import ExistsComparator from '../../src/conditions/comparators/ExistsComparator';

describe('ExistsComparator', () => {
  it('Works', () => {
    const comp = new ExistsComparator();
    expect(comp.exprString('#test')).toBe('attribute_exists(#test)');
  });
});
