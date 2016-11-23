import NotExistsComparator from '../../src/conditions/comparators/NotExistsComparator';

describe('NotExistsComparator', () => {
  it('Works', () => {
    const comp = new NotExistsComparator();
    expect(comp.exprString('#test')).toBe('attribute_not_exists(#test)');
  });
});
