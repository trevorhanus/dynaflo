import * as utils from '../../src/utils';
import Fluent from '../../src/';
import Condition from '../../src/conditions/Condition';
import getTestConfig from '../../src/getTestConfig';

let f;
describe('attr()', () => {

  beforeAll(done => {
    f = new Fluent(getTestConfig());
    done();
  });

  beforeEach(done => {
    utils.getSafeExpressionName = getSafeExpressionNameMock();
    utils.getSafeExpressionValue = getSafeExpressionValueMock();
    done();
  });

  it('creates a condition instance', () => {
    const cond = f.attr('title');
    expect(cond).toBeInstanceOf(Condition);
  });

  it('deeply nested condition', () => {
    const cond1 = f.attr('foo').ne(false);
    const cond2 = f.attr('bar').lt(10);
    const cond3 = f.attr('baz').gt(4);
    const cond4 = f.attr('derp').eq(40);
    const cond5 = f.attr('bing').ge(6);
    cond1.and(cond2, cond4.or(cond5)).or(cond3);
    const expected = '((#name1 <> :value1 AND (#name2 < :value2) AND ((#name4 = :value4) OR (#name5 >= :value5))) OR (#name3 > :value3))';
    expect(cond1.exprString()).toBe(expected);
  });

  it('deeply nested condition2', () => {
    const cond1 = f.attr('foo').ne(false);
    const cond2 = f.attr('bar').lt(10);
    const cond3 = f.attr('baz').gt(4);
    const cond4 = f.attr('derp').eq(40);
    const cond5 = f.attr('bing').ge(6);
    cond1.and(
      cond2.or(cond3)
    ).and(
      cond4.and(cond5)
    );
    const expected = '(#name1 <> :value1 AND ((#name2 < :value2) OR (#name3 > :value3)) AND (#name4 = :value4 AND (#name5 >= :value5)))';
    expect(cond1.exprString()).toBe(expected);
  });

  it('comma separated ors', () => {
    const cond1 = f.attr('foo').ne(false);
    const cond2 = f.attr('bar').lt(10);
    const cond3 = f.attr('baz').gt(4);
    const cond4 = f.attr('derp').eq(40);
    const cond5 = f.attr('bing').ge(6);
    cond1.or(cond2, cond3, cond4);
    const expected = '((#name1 <> :value1) OR (#name2 < :value2) OR (#name3 > :value3) OR (#name4 = :value4))';
    expect(cond1.exprString()).toBe(expected);
  });

  it('chained ors', () => {
    const cond1 = f.attr('foo').ne(false);
    const cond2 = f.attr('bar').lt(10);
    const cond3 = f.attr('baz').gt(4);
    const cond4 = f.attr('derp').eq(40);
    const cond5 = f.attr('bing').ge(6);
    cond1.or(cond2).or(cond3).or(cond4);
    const expected = '((#name1 <> :value1) OR (#name2 < :value2) OR (#name3 > :value3) OR (#name4 = :value4))';
    expect(cond1.exprString()).toBe(expected);
  });
});

/////////////////////////////

function getSafeExpressionNameMock() {
  let counter = 1;
  return () => {
    return '#name' + counter++;
  }
}

function getSafeExpressionValueMock() {
  let counter = 1;
  return () => {
    return ':value' + counter++;
  }
}
