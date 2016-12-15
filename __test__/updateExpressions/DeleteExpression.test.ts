import DeleteExpression from '../../src/updateExpressions/DeleteExpression';

describe('DeleteExpression', () => {

  it('DELETE expression', () => {
    const items = ['item1', 'item2'];
    const delExpr = new DeleteExpression('test', items);
    const expr = delExpr.exprString();
    const valueMap = delExpr.valueMap();
    const nameMap = delExpr.nameMap();
    expect(expr.includes('DELETE ')).toBe(true);
    expect(Object.keys(valueMap).length).toBe(2);
    expect(Object.keys(nameMap).length).toBe(1);
  });
});
