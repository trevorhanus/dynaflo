import Dynaflo from '..';
import Condition from '../conditions/Condition';
import {Base} from './Base';

export default class Delete extends Base {
  key: Object;
  whenCondition?: Condition;
  
  constructor(tableName: string, key: Object) {
    super(tableName);
    this.key = key;
  }

  when(condition: Condition) {
    this.whenCondition = condition;
    return this;
  }

  nameMap(): Dynaflo.NameMap {
    if (this.whenCondition) {
      return this.whenCondition.nameMap();
    } else {
      return {};
    }
  }

  valueMap(): Dynaflo.ValueMap {
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
