import {Param} from '../../src/params/ParamEnum';
import {Key} from '../../src/params';

describe('Key Param', () => {
  it('Returns the object when toJS is called', () => {
    const key = {
      key1: 'Value1',
      key2: true
    };
    const param = new Key(key);
    expect(param.toJS()).toBe(key);
  });

  it('Knows what type of param it is', () => {
    const key = {
      key1: 'Value1',
      key2: true
    };
    const param = new Key(key);
    expect(param.paramType).toBe(Param.Key);
  });
});
