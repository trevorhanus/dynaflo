import Attribute, {AttributeError} from '../../src/conditions/Attribute';

describe('Attribute', () => {

  it('Single Token', () => {
    const attr = new Attribute('fieldName');
    expect(attr.tokens.length).toBe(1);
    expect(attr.safePath().length).toBe(9);
    expect(attr.safePath()[0]).toBe('#');
    Object.keys(attr.nameMap()).forEach(safeToken => {
      expect(attr.nameMap()[safeToken]).toBe('fieldName');
    });
  });

  it('Nested Object', () => {
    const attr = new Attribute({top:{nested:{deeper:true}}});
    expect(attr.tokens.join('.')).toBe('top.nested.deeper');
    expect(attr.safePath().split('.').length).toBe(3);
  });

  it('Throws on array in nested path', () => {
    expect(() => {
      const attr = new Attribute({top:{nested:['deeper']}});
    }).toThrow();
  });
});
