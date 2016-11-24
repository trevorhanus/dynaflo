import RemoveExpression from '../../src/update/RemoveExpression';

describe('RemoveExpression', () => {

  it('REMOVE expression', () => {
    const attributes = ['test', {info:['rating', 'cast']}];
    const removeExpr = new RemoveExpression(attributes);
    const expr = removeExpr.exprString();
    const nameMap = removeExpr.nameMap();
    const valueMap = removeExpr.valueMap();
    expect(Object.keys(nameMap).length).toBe(4);
    expect(Object.keys(valueMap).length).toBe(0);
    expect(expr.includes('REMOVE')).toBe(true);
  });
});
