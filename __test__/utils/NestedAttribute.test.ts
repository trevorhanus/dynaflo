import NestedAttribute from '../../src/utils/NestedAttribute';

describe('NestedAttribute', () => {

  it('Shorthand', () => {
    const attr = {
      title: true,
      info: ['rating', 'cast']
    };
    const nestedAttr = new NestedAttribute(attr);
    const nameMap = nestedAttr.nameMap();
    const joinedSafePaths = nestedAttr.joinedSafePaths();
    expect(joinedSafePaths.length).toBe(3);
    expect(Object.keys(nameMap).length).toBe(4);
  });

  it('Long', () => {
    const attr = {
      title: true,
      info: {
        rating: true,
        cast: true
      }
    };
    const nestedAttr = new NestedAttribute(attr);
    const nameMap = nestedAttr.nameMap();
    const joinedSafePaths = nestedAttr.joinedSafePaths();
    expect(joinedSafePaths.length).toBe(3);
    expect(Object.keys(nameMap).length).toBe(4);
  });

  it('Single path', () => {
    const attr = {
      info: {
        rating: {
          end: true
        }
      }
    };
    const nestedAttr = new NestedAttribute(attr);
    const nameMap = nestedAttr.nameMap();
    const joinedSafePaths = nestedAttr.joinedSafePaths();
    expect(joinedSafePaths.length).toBe(1);
    expect(Object.keys(nameMap).length).toBe(3);
  });
});
