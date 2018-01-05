import {Param, ValueMap, NameMap} from './Param';
import Condition, {ConditionLike} from '../conditions/Condition';

export default class WhereConditionParam implements Param {
  private whereCondition: Condition;
  key: string = 'ConditionExpression';

  constructor(conditionOrAttributesToValueMap: ConditionLike) {
    if (conditionOrAttributesToValueMap instanceof Condition) {
      this.whereCondition = conditionOrAttributesToValueMap;
    } else {
      this.whereCondition = Condition.fromAttributesToValueMap(conditionOrAttributesToValueMap);
    }
  }

  value(): string {
    return this.whereCondition.exprString();
  }

  safeValueMap(): ValueMap {
    return this.whereCondition.valueMap();
  }

  safeNameMap(): NameMap {
    return this.whereCondition.nameMap();
  }
}
