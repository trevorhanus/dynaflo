import Base from './Base';

export default class Delete extends Base implements dn.whereable, dn.iExpressionMaps {
  key: Object;
  whereCondition?: dn.Condition;
  
  constructor(tableName: string, key: Object) {
    super(tableName);
    this.key = key;
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
    return super.run('delete');
  }
}
