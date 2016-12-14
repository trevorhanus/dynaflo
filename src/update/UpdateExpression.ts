import Dynaflo from '../';
import {Expression} from '../expression'; 
import SetExpression from './SetExpression';
import RemoveExpression from './RemoveExpression';
import DeleteExpression from './DeleteExpression';
import {assign as _assign} from 'lodash';

export default class UpdateExpression implements Expression {
  setExpression: SetExpression;
  removeExpression: RemoveExpression;
  deleteExpression: DeleteExpression;

  constructor() {}

  exprString(): string {
    let exprs: string[] = [];
    if (this.setExpression) {
      exprs.push(this.setExpression.exprString());
    }
    if (this.removeExpression) {
      exprs.push(this.removeExpression.exprString());
    }
    if (this.deleteExpression) {
      exprs.push(this.deleteExpression.exprString());
    }
    return exprs.join(' ');
  }

  nameMap(): Dynaflo.NameMap {
    let nameMap = {};
    if (this.setExpression) {
      _assign(nameMap, this.setExpression.nameMap());
    }
    if (this.removeExpression) {
      _assign(nameMap, this.removeExpression.nameMap());
    }
    if (this.deleteExpression) {
      _assign(nameMap, this.deleteExpression.nameMap());
    }
    return nameMap;
  };

  valueMap(): Dynaflo.ValueMap {
    let valueMap = {};
    if (this.setExpression) {
      _assign(valueMap, this.setExpression.valueMap());
    }
    if (this.removeExpression) {
      _assign(valueMap, this.removeExpression.valueMap());
    }
    if (this.deleteExpression) {
      _assign(valueMap, this.deleteExpression.valueMap());
    }
    return valueMap;
  };
}
