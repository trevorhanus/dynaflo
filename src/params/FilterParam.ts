import {Param, ValueMap, NameMap} from '../params/Param';
import Condition, {ConditionLike} from '../conditions/Condition';

export default class FilterParam implements Param {
  private filterCondition: Condition;
  key: string = 'FilterExpression';

  constructor(conditionOrAttributesToValueMap: ConditionLike) {
    if (conditionOrAttributesToValueMap instanceof Condition) {
      this.filterCondition = conditionOrAttributesToValueMap;
    } else {
      this.filterCondition = Condition.fromAttributesToValueMap(conditionOrAttributesToValueMap);
    }
  }

  value(): string {
    return this.filterCondition.exprString();
  }

  safeValueMap(): ValueMap {
    return this.filterCondition.valueMap();
  }

  safeNameMap(): NameMap {
    return this.filterCondition.nameMap();
  }
}
