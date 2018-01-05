import d from '../dynaflo_test_instance'; 
import InComparator from '../../src/conditions/comparators/InComparator';

describe('InComparator', () => {

  it('three numbers', () => {
    const comp = new InComparator([10, 11, 12]);
    const str = comp.exprString('#test');
    expect(str.includes('#test IN :')).toBe(true);
  });

  it('two attributes', () => {
    const attr1 = d.attr('test');
    const attr2 = d.attr({info:{rating: true}});
    const comp = new InComparator([attr1, attr2]);
    const str = comp.exprString('#test');
    expect(str.includes('#test IN #')).toBe(true);
  });

  it('attribute, number and string', () => {
    const attr1 = d.attr({info:{rating: true}});
    const comp = new InComparator([10, 'derp', attr1]);
    const str = comp.exprString('#test');
    expect(str.includes('#test IN :')).toBe(true);
  });
});
