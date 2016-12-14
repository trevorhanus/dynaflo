import Dynaflo from '..';
import {docClient} from '../Dynaflo';
import {Base} from './Base';
import Condition, {ConditionLike} from '../conditions/Condition';
import UpdateExpression from '../update/UpdateExpression';
import SetExpression from '../update/SetExpression';
import DeleteExpression from '../update/DeleteExpression';
import RemoveExpression from '../update/RemoveExpression';
import {assign as _assign} from 'lodash';

export default class Update extends Base {
  private key: any;
  private whenCondition?: Condition;
  private updateExpression: UpdateExpression = new UpdateExpression();

  constructor(tableName: string, key: any) {
    super(tableName);
    this.key = key;
  }

  set(item: any) {
    this.updateExpression.setExpression = new SetExpression(item);
    return this;
  }

  delete(topLevelAttr: string, itemsToDelete: string[]) {
    this.updateExpression.deleteExpression = new DeleteExpression(topLevelAttr, itemsToDelete);
    return this;
  }

  remove(...attributes: (string | any)[]) {
    this.updateExpression.removeExpression = new RemoveExpression(attributes);
    return this;
  }

  when(conditionOrAttributesToValueMap: ConditionLike) {
    if (conditionOrAttributesToValueMap instanceof Condition) {
      this.whenCondition = conditionOrAttributesToValueMap;
    } else {
      this.whenCondition = Condition.fromAttributesToValueMap(conditionOrAttributesToValueMap);
    }
    return this;
  }

  run(): Promise<any> {
    return super.run('update');
  }

  // private getUpdateExpression() {
  //   let exprs: string[] = [];
  //   exprs.push(this.updateExpression.exprString());
  //   return exprs.join(' ');
  // }

  private nameMap(): Dynaflo.NameMap {
    let nameMap = {};
    _assign(nameMap, this.updateExpression.nameMap());
    if (this.whenCondition) {
      _assign(nameMap, this.whenCondition.nameMap());
    }
    return nameMap;
  }

  private valueMap(): Dynaflo.ValueMap {
    let valueMap = {};
    _assign(valueMap, this.updateExpression.valueMap());
    if (this.whenCondition) {
      _assign(valueMap, this.whenCondition.valueMap());
    }
    return valueMap;
  }
}
