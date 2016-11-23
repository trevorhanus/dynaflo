import SymbolComparator from '../../src/conditions/SymbolComparator';
import Condition from '../../src/conditions/Condition';

describe('SymbolComparator', () => {

  it('less than number', () => {
    const comp = new SymbolComparator(' < ', 10);
    const str = comp.str('#test');
    expect(str.includes('#test < :')).toBe(true);
  });

  it('equals boolean', () => {
    const comp = new SymbolComparator(' = ', true);
    const str = comp.str('#test');
    expect(str.includes('#test = :')).toBe(true);
  });

  it('less than or equal to another attribute', () => {
    const cond = new Condition('test');
    const comp = new SymbolComparator(' <= ', cond);
    const str = comp.str('#test');
    expect(str.includes('#test <= #')).toBe(true);
  });
});
