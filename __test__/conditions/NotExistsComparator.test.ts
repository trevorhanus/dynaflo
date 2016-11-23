import NotExistsComparator from '../../src/conditions/NotExistsComparator';

describe('NotExistsComparator', () => {
  it('Works', () => {
    const comp = new NotExistsComparator();
    expect(comp.str('#test')).toBe('attribute_not_exists(#test)');
  });
});
