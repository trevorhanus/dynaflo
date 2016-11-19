import {Param} from '../../src/params/ParamEnum';
import {ReturnItemCollectionMetrics} from '../../src/params';

describe('ReturnItemCollectionMetrics Param', () => {
  
  it('Returns default value when toJS is called', () => {
    const param = new ReturnItemCollectionMetrics();
    expect(param.toJS()).toBe('NONE'); 
  });

  it('Knows what type of param it is', () => {
    const param = new ReturnItemCollectionMetrics();
    expect(param.paramType).toBe(Param.ReturnItemCollectionMetrics);
  });

  it('Can set a different value', () => {
    const param = new ReturnItemCollectionMetrics();
    param.set('SIZE');
    expect(param.toJS()).toBe('SIZE');
  });

});
