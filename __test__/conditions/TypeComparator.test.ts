import TypeComparator from '../../src/conditions/TypeComparator';

describe('TypeComparator', () => {

  it('String', () => {
    const comp = new TypeComparator('S');
    const str = comp.str('#test');
    expect(str.includes('attribute_type(#test, ')).toBe(true);
    const valueMap = comp.valueMap();
    Object.keys(valueMap).forEach(key => {
      expect(valueMap[key]).toBe('S');
    });
  });
});
