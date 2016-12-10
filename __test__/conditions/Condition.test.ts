import Condition from '../../src/conditions/Condition';

describe('Condition', () => {
  it('Instantiates', () => {
    const cond = new Condition('title');
    expect(cond).not.toBe(null);
    expect(cond).not.toBe(undefined);
  });

  it('retuns expression name map for single condition', () => {
    const cond = new Condition('title');
    const map = cond.nameMap();
    Object.keys(map).forEach(key => {
      expect(key[0]).toBe('#');
      expect(map[key]).toBe('title');
    });
  });

  it('expression name map with or condition', () => {
    const cond = new Condition('title');
    const orCond = new Condition('orCond');
    cond.or(orCond);
    const map = cond.nameMap();
    expect(Object.keys(map).length).toBe(2);
  });

  it('expression name map with and condition', () => {
    const cond = new Condition('title');
    const andCond = new Condition('andCond');
    cond.and(andCond);
    const map = cond.nameMap();
    expect(Object.keys(map).length).toBe(2);
  });

  it('equals or equals', () => {
    let cond = new Condition('id');
    cond = cond.eq('test');
    let orCond = new Condition('id');
    orCond = orCond.eq('test');
    cond.or(orCond);
    const exprString = cond.exprString();
    expect(exprString.includes('OR')).toBe(true);
    expect(exprString.includes('AND')).toBe(false);
  });

  it('retuns expression name map for single nested attribute', () => {
    const cond = new Condition({top:{nested: true}});
    const map = cond.nameMap();
    expect(Object.keys(map).length).toBe(2);
  });

  it('can chain and condition with or condition', () => {
    const cond = new Condition('title');
    const andCond = new Condition('andCond');
    const orCond = new Condition('orCond');
    cond.or(orCond).and(andCond);
    const map = cond.nameMap();
    expect(Object.keys(map).length).toBe(3);
  });

  it('expression with AND and OR', () => {
    const cond = new Condition('title');
    const expression = cond.concatExpression('Expression', ' AND andExpression', ' OR orExpression');
    expect(expression).toBe('((Expression AND andExpression) OR orExpression)');
  });

  it('expression no AND and no OR', () => {
    const cond = new Condition('title');
    const expression = cond.concatExpression('Expression', '', '');
    expect(expression).toBe('(Expression)');
  });

  it('expression with AND and not OR', () => {
    const cond = new Condition('title');
    const expression = cond.concatExpression('Expression', ' AND andExpression', '');
    expect(expression).toBe('(Expression AND andExpression)');
  });
});
