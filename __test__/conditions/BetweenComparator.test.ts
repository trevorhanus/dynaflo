import BetweenComparator from '../../src/conditions/comparators/BetweenComparator';

describe('BetweenComparator', () => {

  it('Works', () => {
    const comp = new BetweenComparator(5, 10);
    const str = comp.exprString('#test');
    const valueMap = comp.valueMap();
    expect(str.includes('BETWEEN')).toBe(true);
    expect(str.includes('AND')).toBe(true);
    expect(str.includes('#test')).toBe(true);
    expect(Object.keys(valueMap).length).toBe(2);
  });
});
