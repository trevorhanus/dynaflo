import {docClient} from '../fluent';
import Base from './Base';
import Condition from '../conditions/Condition';

export default class Put extends Base implements f.whereable, f.iExpressionMaps {
  item: Object;
  whenCondition?: f.Condition;

  constructor(tableName: string, item: Object) {
    super(tableName);
    this.item = item;
  }

  when(conditionOrAttributesToValueMap: (f.Condition | Object)) {
    if (conditionOrAttributesToValueMap instanceof Condition) {
      this.whenCondition = conditionOrAttributesToValueMap;
    } else {
      this.whenCondition = Condition.fromAttributesToValueMap(conditionOrAttributesToValueMap);
    }
    return this;
  }

  nameMap(): f.NameMap {
    if (this.whenCondition) {
      return this.whenCondition.nameMap();
    } else {
      return {};
    }
  }

  valueMap(): f.ValueMap {
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
