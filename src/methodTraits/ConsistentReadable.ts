import BaseMethod from '../itemMethods/BaseMethod';
import ConsistentReadParam from '../params/ConsistentReadParam';

export default class ConsistentReadable extends BaseMethod {
  
  consistentRead(option: boolean): BaseMethod {
    const param = new ConsistentReadParam(option);
    super.addParam(param);
    return this;
  }
}
