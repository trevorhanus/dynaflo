import BaseMethod from '../methods/BaseMethod';
import Condition, {ConditionLike} from '../conditions/Condition';
import WhereConditionParam from '../params/WhereConditionParam';

export default class Whenable extends BaseMethod {
  
  when(conditionOrAttributesToValueMap: ConditionLike): BaseMethod {
    const whenConditionParam = new WhereConditionParam(conditionOrAttributesToValueMap);
    super.addParam(whenConditionParam);
    return this;
  }
}
