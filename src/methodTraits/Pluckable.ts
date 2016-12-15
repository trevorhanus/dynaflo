import BaseMethod from '../itemMethods/BaseMethod';
import Condition, {ConditionLike} from '../conditions/Condition';
import PluckParam from '../params/PluckParam';

export default class Whereable extends BaseMethod {
  
  pluck(...topLevelOrNestedAttributes: (string|any)[]): BaseMethod {
    const pluckParam = new PluckParam(topLevelOrNestedAttributes);
    super.addParam(pluckParam);
    return this;
  }
}
