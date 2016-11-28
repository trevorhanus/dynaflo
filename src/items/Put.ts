import {docClient} from '../dynamoDb';
import Base from './Base';
import Condition from '../conditions/Condition';

export default class Put extends Base implements dn.whereable, dn.iExpressionMaps {
  item: Object;
  whenCondition?: dn.Condition;

  constructor(tableName: string, item: Object) {
    super(tableName);
    this.item = item;
  }

  when(conditionOrAttributesToValueMap: (dn.Condition | Object)) {
    if (conditionOrAttributesToValueMap instanceof Condition) {
      this.whenCondition = conditionOrAttributesToValueMap;
    } else {
      this.whenCondition = Condition.fromAttributesToValueMap(conditionOrAttributesToValueMap);
    }
    return this;
  }

  nameMap(): dn.NameMap {
    if (this.whenCondition) {
      return this.whenCondition.nameMap();
    } else {
      return {};
    }
  }

  valueMap(): dn.ValueMap {
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
