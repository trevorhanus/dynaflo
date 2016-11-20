import {getSafeExpressionName} from '../../src/utils';

describe('Utils getSafeExpressionName', () => {
  
  it('Returns a random string of length 9', () => {
    const safeName = getSafeExpressionName();
    expect(typeof safeName).toBe('string');
    expect(safeName.length).toBe(9);
    expect(safeName[0]).toBe('#');
  });
});
