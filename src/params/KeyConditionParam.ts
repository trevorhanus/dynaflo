import {Param, ValueMap, NameMap} from '../params/Param';
import Condition, {ConditionLike} from '../conditions/Condition';

export default class KeyConditionParam implements Param {
  private keyCondition: Condition;
  key: string = 'KeyConditionExpression';

  constructor(keyConditionOrAttributesToValueMap: ConditionLike) {
    if (keyConditionOrAttributesToValueMap instanceof Condition) {
      this.keyCondition = keyConditionOrAttributesToValueMap;
    } else {
      this.keyCondition = Condition.fromAttributesToValueMap(keyConditionOrAttributesToValueMap);
    }
  }

  value(): string {
    return this.keyCondition.exprString();
  }

  safeValueMap(): ValueMap {
    return this.keyCondition.valueMap();
  }

  safeNameMap(): NameMap {
    return this.keyCondition.nameMap();
  }
}
