import {Param} from '../../src/params/ParamEnum';
import {ReturnValues} from '../../src/params';

describe('ReturnValues Param', () => {
  
  it('Returns default value when toJS is called', () => {
    const param = new ReturnValues();
    expect(param.toJS()).toBe('NONE'); 
  });

  it('Knows what type of param it is', () => {
    const param = new ReturnValues();
    expect(param.paramType).toBe(Param.ReturnValues);
  });

  it('Can set a different value', () => {
    const param = new ReturnValues();
    param.set('UPDATED_NEW');
    expect(param.toJS()).toBe('UPDATED_NEW');
  });

});
