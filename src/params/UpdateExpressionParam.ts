import {Param, NameMap, ValueMap} from './Param';
import {Expression} from '../interfaces';
import {assign as _assign} from 'lodash';

export default class UpdateExpressionParam implements Param {
  key: string = 'UpdateExpression';
  private expressions: Expression[] = [];

  constructor() {}

  addExpression(expression: Expression): void {
    this.expressions.push(expression);
  }

  value(): string {
    let expressionStrings: string[] = [];
    this.expressions.forEach(expression => {
      expressionStrings.push(expression.exprString());
    });
    return expressionStrings.join(' ');
  }

  safeNameMap(): NameMap {
    let nameMap = {};
    this.expressions.forEach(expression => {
      _assign(nameMap, expression.nameMap());
    });
    return nameMap;
  }

  safeValueMap(): ValueMap {
    let valueMap = {};
    this.expressions.forEach(expression => {
      _assign(valueMap, expression.valueMap());
    });
    return valueMap;
  }
}
