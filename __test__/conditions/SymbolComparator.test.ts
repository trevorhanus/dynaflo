import SymbolComparator from '../../src/conditions/SymbolComparator';
import Attribute from '../../src/conditions/Attribute';

describe('SymbolComparator', () => {

  it('less than number', () => {
    const comp = new SymbolComparator(' < ', 10);
    const str = comp.string('#test');
    expect(str.includes('#test < :')).toBe(true);
  });

  it('equals boolean', () => {
    const comp = new SymbolComparator(' = ', true);
    const str = comp.string('#test');
    expect(str.includes('#test = :')).toBe(true);
  });

  it('less than or equal to another attribute', () => {
    const attr = new Attribute('test');
    const comp = new SymbolComparator(' <= ', attr);
    const str = comp.string('#test');
    expect(str.includes('#test <= #')).toBe(true);
  });
});
