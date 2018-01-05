import BaseMethod from '../itemMethods/BaseMethod';
import Condition, {ConditionLike} from '../conditions/Condition';
import LimitParam from '../params/LimitParam';

export default class Limitable extends BaseMethod {
  
  limit(limit: number): BaseMethod {
    const limitParam = new LimitParam(limit);
    super.addParam(limitParam);
    return this;
  }
}
