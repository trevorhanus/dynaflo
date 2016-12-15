import BaseMethod from '../itemMethods/BaseMethod';
import Condition, {ConditionLike} from '../conditions/Condition';
import FilterParam from '../params/FilterParam';

export default class Filterable extends BaseMethod {
  
  filter(condition: Condition): BaseMethod {
    const filterParam = new FilterParam(condition);
    super.addParam(filterParam);
    return this;
  }
}
