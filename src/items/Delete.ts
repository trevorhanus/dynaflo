import Base from './Base';

export default class Delete extends Base implements dn.whereable, dn.iExpressionMaps {
  key: Object;
  whenCondition?: dn.Condition;
  
  constructor(tableName: string, key: Object) {
    super(tableName);
    this.key = key;
  }

  when(condition: dn.Condition) {
    this.whenCondition = condition;
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
    return super.run('delete');
  }
}
