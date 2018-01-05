import ConsistentReadParam from '../../src/params/ConsistentReadParam';

describe('Consistent Read Param', () => {

  it('Implements Param Properly', () => {
    const param = new ConsistentReadParam(false);
    expect(param.key).toBe('ConsistentRead');
    expect(param.value()).toBe(false);
    expect(param.safeValueMap()).toEqual({});
    expect(param.safeNameMap()).toEqual({});
  });
});
