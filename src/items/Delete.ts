import Base from './Base';

export default class Delete extends Base implements f.whereable, f.iExpressionMaps {
  key: Object;
  whenCondition?: f.Condition;
  
  constructor(tableName: string, key: Object) {
    super(tableName);
    this.key = key;
  }

  when(condition: f.Condition) {
    this.whenCondition = condition;
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
    return super.run('delete');
  }
}
