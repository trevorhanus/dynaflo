import TypeComparator from '../../src/conditions/comparators/TypeComparator';

describe('TypeComparator', () => {

  it('String', () => {
    const comp = new TypeComparator('S');
    const str = comp.exprString('#test');
    expect(str.includes('attribute_type(#test, ')).toBe(true);
    const valueMap = comp.valueMap();
    Object.keys(valueMap).forEach(key => {
      expect(valueMap[key]).toBe('S');
    });
  });
});
