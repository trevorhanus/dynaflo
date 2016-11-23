import dn from '../../src/dynanode';
import InComparator from '../../src/conditions/InComparator';

describe('InComparator', () => {

  it('three numbers', () => {
    const comp = new InComparator([10, 11, 12]);
    const str = comp.str('#test');
    expect(str.includes('#test IN :')).toBe(true);
  });

  it('two attributes', () => {
    const attr1 = dn.attr('test');
    const attr2 = dn.attr({info:{rating: true}});
    const comp = new InComparator([attr1, attr2]);
    const str = comp.str('#test');
    expect(str.includes('#test IN #')).toBe(true);
  });

  it('attribute, number and string', () => {
    const attr1 = dn.attr({info:{rating: true}});
    const comp = new InComparator([10, 'derp', attr1]);
    const str = comp.str('#test');
    expect(str.includes('#test IN :')).toBe(true);
  });
});
