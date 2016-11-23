import {getSafeExpressionValue} from '../../src/utils';

describe('Utils getSafeExpressionValue', () => {
  
  it('Returns a random string of length 9', () => {
    const safeValue = getSafeExpressionValue();
    expect(typeof safeValue).toBe('string');
    expect(safeValue.length).toBe(9);
    expect(safeValue[0]).toBe(':');
  });
});
