// @tch - Had to name this file item2.test.ts 
// because jest wasn't processing it as item.test.ts
import {Param} from '../../src/params/ParamEnum';
import {Item} from '../../src/params';

describe('Item Param', () => {
  it('Returns the object when toJS is called', () => {
    const item = {
      key1: 'Value1',
      key2: true,
      key3: 15,
      key4: null
    };
    const param = new Item(item);
    expect(param.toJS()).toBe(item); 
  });

  it('Knows what type of param it is', () => {
    const item = {
      key1: 'Value1',
      key2: true,
      key3: 15,
      key4: null
    };
    const param = new Item(item);
    expect(param.paramType).toBe(Param.Item);
  });
});
