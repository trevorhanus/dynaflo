import BeginsWithComparator from '../../src/conditions/comparators/BeginsWithComparator';

describe('BeginsWithComparator', () => {

  it('String', () => {
    const comp = new BeginsWithComparator('test');
    const str = comp.exprString('#test');
    expect(str.includes('begins_with(#test, ')).toBe(true);
    const valueMap = comp.valueMap();
    Object.keys(valueMap).forEach(key => {
      expect(valueMap[key]).toBe('test');
    });
  });
});
