import BaseMethod from '../methods/BaseMethod';
import Condition, {ConditionLike} from '../conditions/Condition';
import KeyConditionParam from '../params/KeyConditionParam';

export default class Whereable extends BaseMethod {
  
  whereKey(keyConditionOrAttributesToValueMap: ConditionLike): BaseMethod {
    const keyConditionParam = new KeyConditionParam(keyConditionOrAttributesToValueMap);
    super.addParam(keyConditionParam);
    return this;
  }
}
