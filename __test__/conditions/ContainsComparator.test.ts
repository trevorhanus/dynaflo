import ContainsComparator from '../../src/conditions/comparators/ContainsComparator';

describe('ContainsComparator', () => {

  it('String', () => {
    const comp = new ContainsComparator('test');
    const str = comp.exprString('#test');
    expect(str.includes('contains(#test, ')).toBe(true);
    const valueMap = comp.valueMap();
    Object.keys(valueMap).forEach(key => {
      expect(valueMap[key]).toBe('test');
    });
  });
});
