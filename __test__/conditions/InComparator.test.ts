import Dynanode from '../../src/dynanode';
import InComparator from '../../src/conditions/comparators/InComparator';

let dn;
describe('InComparator', () => {

  beforeAll(done => {
    dn = new Dynanode({
      region: 'us-west-2',
      endpoint: 'http://localhost:7777'
    });
    done();
  });

  it('three numbers', () => {
    const comp = new InComparator([10, 11, 12]);
    const str = comp.exprString('#test');
    expect(str.includes('#test IN :')).toBe(true);
  });

  it('two attributes', () => {
    const attr1 = dn.attr('test');
    const attr2 = dn.attr({info:{rating: true}});
    const comp = new InComparator([attr1, attr2]);
    const str = comp.exprString('#test');
    expect(str.includes('#test IN #')).toBe(true);
  });

  it('attribute, number and string', () => {
    const attr1 = dn.attr({info:{rating: true}});
    const comp = new InComparator([10, 'derp', attr1]);
    const str = comp.exprString('#test');
    expect(str.includes('#test IN :')).toBe(true);
  });
});
