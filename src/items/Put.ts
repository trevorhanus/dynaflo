import {docClient} from '../dynamoDb';
import Base from './Base';

export default class Put extends Base {
  item: Object;
  whereCondition: dn.Condition;

  constructor(tableName: string, item: Object) {
    super(tableName);
    this.item = item;
  }

  where(condition: dn.Condition) {
    this.whereCondition = condition;
    return this;
  }

  nameMap(): dn.NameMap {
    if (this.whereCondition) {
      return this.whereCondition.nameMap();
    } else {
      return {};
    }
  }

  valueMap(): dn.ValueMap {
    if (this.whereCondition) {
      return this.whereCondition.valueMap();
    } else {
      return {};
    }
  }

  run(): Promise<any> {
    return super.run('put');
  }
}
