import SetExpression from '../../src/update/SetExpression';

describe('SetExpression', () => {

  it('SET expression', () => {
    const item = {
      title: 'The Title',
      info: {
        rating: 5.5,
        plot: 'Everything happens',
        recommended: true,
        cast: ['Larry', 'Moe', 'Curly'],
        other: {
          resolution: '4k'
        }
      }
    }
    const setExpression = new SetExpression(item);
    const expr = setExpression.exprString()
    expect(expr.includes('SET')).toBe(true);
    expect(setExpression._fullPathExpressions.length).toBe(6);
    expect(Object.keys(setExpression.valueMap()).length).toBe(6);
    expect(Object.keys(setExpression.nameMap()).length).toBe(8);
  });

  it('two top level attributes', () => {
    const item = {
      title: 'The Title',
      info: 'The Info'
    };
    const setExpression = new SetExpression(item);
    const expr = setExpression.exprString()
    expect(expr.includes('SET')).toBe(true);
    expect(setExpression._fullPathExpressions.length).toBe(2);
    expect(Object.keys(setExpression.valueMap()).length).toBe(2);
    expect(Object.keys(setExpression.nameMap()).length).toBe(2);
  });
});
