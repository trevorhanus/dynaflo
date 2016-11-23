import Attribute from './Attribute';
import Comparator from './Comparator';
import SymbolComparator from './SymbolComparator';
import ExistsComparator from './ExistsComparator';
import {assign as _assign} from 'lodash';

export default class Condition {
  attribute: Attribute;
  comparator: Comparator;
  andCondition: Condition;
  orCondition: Condition;

  constructor(attribute: (string | Object)) {
    this.attribute = new Attribute(attribute);
  }

  nameMap() {
    const map = {};
    _assign(map, this.attribute.tokenMap);
    if (this.andCondition) {
      _assign(map, this.andCondition.nameMap());
    }
    if (this.orCondition) {
      _assign(map, this.orCondition.nameMap());
    }
    return map;
  }

  or(condition: Condition) {
    this.orCondition = condition;
    return this;
  }

  and(condition: Condition) {
    this.andCondition = condition;
    return this;
  }

  toExpressionString(): string {
    const safePath = this.attribute.safePath;
    const expression = this.comparator.string(safePath);
    const andExpression = this.andCondition && this.andCondition.toExpressionString();
    const orExpression = this.orCondition && this.orCondition.toExpressionString();
    return this.concatExpression(expression, andExpression, orExpression);
  }

  concatExpression(expression: string, andExpression: string, orExpression: string): string {
    if (!expression) { throw new ConditionError('Cannot concat an expression without an expression'); }
    if (!andExpression && !orExpression) {
      return '( ' + expression + ' )';
    } else if (andExpression && !orExpression) {
      return '( ' + expression + ' AND ' + andExpression + ' )';
    } else {
      return '( ( ' + expression + ' AND ' + andExpression + ' ) OR ' + orExpression + ' )'; 
    }
  }

  lt(operand: (number | boolean | string)) {
    const symbol = ' < ';
    this.comparator = new SymbolComparator(symbol, operand);
    return this;
  }

  gt(operand: (number | boolean | string)) {
    const symbol = ' > ';
    this.comparator = new SymbolComparator(symbol, operand);
    return this;
  }

  exists() {
    this.comparator = new ExistsComparator();
    return this;
  }
}

export class ConditionError extends Error {}
