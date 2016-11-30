import {docClient} from '../fluent';
import Base from './Base';
import SetExpression from '../update/SetExpression';
import DeleteExpression from '../update/DeleteExpression';
import RemoveExpression from '../update/RemoveExpression';
import {assign as _assign} from 'lodash';

export default class Update extends Base implements f.whereable {
  key: Object;
  whenCondition?: f.Condition;
  setExpression?: f.UpdateExpression;
  deleteExpression?: f.UpdateExpression;
  removeExpression?: f.UpdateExpression;

  constructor(tableName: string, key: Object) {
    super(tableName);
    this.key = key;
  }

  set(item: Object) {
    this.setExpression = new SetExpression(item);
    return this;
  }

  delete(topLevelAttr: string, itemsToDelete: string[]) {
    this.deleteExpression = new DeleteExpression(topLevelAttr, itemsToDelete);
    return this;
  }

  remove(...attributes: (string | Object)[]) {
    this.removeExpression = new RemoveExpression(attributes);
    return this;
  }

  updateExpression() {
    let exprs: string[] = [];
    if (this.setExpression) {
      exprs.push(this.setExpression.exprString());
    }
    if (this.deleteExpression) {
      exprs.push(this.deleteExpression.exprString());
    }
    if (this.removeExpression) {
      exprs.push(this.removeExpression.exprString());
    }
    return exprs.join(' ');
  }

  when(condition: f.Condition) {
    this.whenCondition = condition;
    return this;
  }

  nameMap(): f.NameMap {
    let nameMap = {};
    if (this.whenCondition) {
      _assign(nameMap, this.whenCondition.nameMap());
    }
    if (this.setExpression) { 
      _assign(nameMap, this.setExpression.nameMap());
    }
    if (this.deleteExpression) {
      _assign(nameMap, this.deleteExpression.nameMap());
    }
    if (this.removeExpression) {
      _assign(nameMap, this.removeExpression.nameMap());
    }
    return nameMap;
  }

  valueMap(): f.ValueMap {
    let valueMap = {};
    if (this.whenCondition) {
      _assign(valueMap, this.whenCondition.valueMap());
    }
    if (this.setExpression) { 
      _assign(valueMap, this.setExpression.valueMap());
    }
    if (this.deleteExpression) {
      _assign(valueMap, this.deleteExpression.valueMap());
    }
    return valueMap;
  }

  run(): Promise<any> {
    return super.run('update');
  }
}
