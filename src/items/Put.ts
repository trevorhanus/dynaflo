import Fluent from '..';
import {docClient} from '../Fluent';
import {Base} from './Base';
import Condition, {ConditionLike} from '../conditions/Condition';

export default class Put extends Base {
  item: Object;
  whenCondition?: Condition;

  constructor(tableName: string, item: Object) {
    super(tableName);
    this.item = item;
  }

  when(conditionOrAttributesToValueMap: ConditionLike) {
    if (conditionOrAttributesToValueMap instanceof Condition) {
      this.whenCondition = conditionOrAttributesToValueMap;
    } else {
      this.whenCondition = Condition.fromAttributesToValueMap(conditionOrAttributesToValueMap);
    }
    return this;
  }

  nameMap(): Fluent.NameMap {
    if (this.whenCondition) {
      return this.whenCondition.nameMap();
    } else {
      return {};
    }
  }

  valueMap(): Fluent.ValueMap {
    if (this.whenCondition) {
      return this.whenCondition.valueMap();
    } else {
      return {};
    }
  }

  run(): Promise<any> {
    return super.run('put');
  }
}
