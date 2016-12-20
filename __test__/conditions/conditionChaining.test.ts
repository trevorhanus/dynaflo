import d from '../dynaflo_test_instance'; 
import * as utils from '../../src/utils';
import Condition from '../../src/conditions/Condition';

describe('attr()', () => {

  beforeEach(done => {
    utils.getSafeExpressionName = getSafeExpressionNameMock();
    utils.getSafeExpressionValue = getSafeExpressionValueMock();
    done();
  });

  it('creates a condition instance', () => {
    const cond = d.attr('title');
    expect(cond).toBeInstanceOf(Condition);
  });

  it('deeply nested condition', () => {
    const cond1 = d.attr('foo').ne(false);
    const cond2 = d.attr('bar').lt(10);
    const cond3 = d.attr('baz').gt(4);
    const cond4 = d.attr('derp').eq(40);
    const cond5 = d.attr('bing').ge(6);
    cond1.and(cond2, cond4.or(cond5)).or(cond3);
    const expected = '((#name1 <> :value1 AND (#name2 < :value2) AND ((#name4 = :value4) OR (#name5 >= :value5))) OR (#name3 > :value3))';
    expect(cond1.exprString()).toBe(expected);
  });

  it('deeply nested condition2', () => {
    const cond1 = d.attr('foo').ne(false);
    const cond2 = d.attr('bar').lt(10);
    const cond3 = d.attr('baz').gt(4);
    const cond4 = d.attr('derp').eq(40);
    const cond5 = d.attr('bing').ge(6);
    cond1.and(
      cond2.or(cond3)
    ).and(
      cond4.and(cond5)
    );
    const expected = '(#name1 <> :value1 AND ((#name2 < :value2) OR (#name3 > :value3)) AND (#name4 = :value4 AND (#name5 >= :value5)))';
    expect(cond1.exprString()).toBe(expected);
  });

  it('comma separated ors', () => {
    const cond1 = d.attr('foo').ne(false);
    const cond2 = d.attr('bar').lt(10);
    const cond3 = d.attr('baz').gt(4);
    const cond4 = d.attr('derp').eq(40);
    const cond5 = d.attr('bing').ge(6);
    cond1.or(cond2, cond3, cond4);
    const expected = '((#name1 <> :value1) OR (#name2 < :value2) OR (#name3 > :value3) OR (#name4 = :value4))';
    expect(cond1.exprString()).toBe(expected);
  });

  it('chained ors', () => {
    const cond1 = d.attr('foo').ne(false);
    const cond2 = d.attr('bar').lt(10);
    const cond3 = d.attr('baz').gt(4);
    const cond4 = d.attr('derp').eq(40);
    const cond5 = d.attr('bing').ge(6);
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
