import {Param} from '../../src/params/ParamEnum';
import {ReturnConsumedCapacity} from '../../src/params';

describe('ReturnConsumedCapacity Param', () => {

  it('Returns default value when toJS is called', () => {
    const param = new ReturnConsumedCapacity();
    expect(param.toJS()).toBe('NONE'); 
  });

  it('Knows what type of param it is', () => {
    const param = new ReturnConsumedCapacity();
    expect(param.paramType).toBe(Param.ReturnConsumedCapacity);
  });

  it('Can set a different value', () => {
    const param = new ReturnConsumedCapacity();
    param.set('TOTAL');
    expect(param.toJS()).toBe('TOTAL');
  });

});
