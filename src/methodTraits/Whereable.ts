import BaseMethod from '../itemMethods/BaseMethod';
import Condition, {ConditionLike} from '../conditions/Condition';
import WhereConditionParam from '../params/WhereConditionParam';

export default class Whereable extends BaseMethod {
  
  where(conditionOrAttributesToValueMap: ConditionLike): BaseMethod {
    const whereConditionParam = new WhereConditionParam(conditionOrAttributesToValueMap);
    super.addParam(whereConditionParam);
    return this;
  }
}
