import {Param} from '../../src/params/ParamEnum';
import {TableName} from '../../src/params';

describe('TableName Param', () => {
  it('Returns name when toJS is called', () => {
    const name = 'Test';
    const param = new TableName(name);
    expect(param.toJS()).toBe(name); 
  });

  it('Knows what type of param it is', () => {
    const name = 'Test';
    const param = new TableName(name);
    expect(param.paramType).toBe(Param.TableName);
  });
});
