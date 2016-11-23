import Attribute from './Attribute';
import SymbolComparator from './SymbolComparator';
import ExistsComparator from './ExistsComparator';
import TypeComparator from './TypeComparator';
import ContainsComparator from './ContainsComparator';
import BeginsWithComparator from './BeginsWithComparator';
import BetweenComparator from './BetweenComparator';
import InComparator from './InComparator';
import {assign as _assign} from 'lodash';

export default class Condition {
  attribute: Attribute;
  comparator: IComparator;
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
    const expression = this.comparator.str(safePath);
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

  eq(operand: (number | boolean | string)) {
    const symbol = ' = ';
    this.comparator = new SymbolComparator(symbol, operand);
    return this;
  }

  ne(operand: (number | boolean | string)) {
    const symbol = ' <> ';
    this.comparator = new SymbolComparator(symbol, operand);
    return this;
  }

  lt(operand: (number | boolean | string)) {
    const symbol = ' < ';
    this.comparator = new SymbolComparator(symbol, operand);
    return this;
  }

  le(operand: (number | boolean | string)) {
    const symbol = ' <= ';
    this.comparator = new SymbolComparator(symbol, operand);
    return this;
  }

  gt(operand: (number | boolean | string)) {
    const symbol = ' > ';
    this.comparator = new SymbolComparator(symbol, operand);
    return this;
  }

  ge(operand: (number | boolean | string)) {
    const symbol = ' >= ';
    this.comparator = new SymbolComparator(symbol, operand);
    return this;
  }

  between(lowOperand: (number | string), highOperand: (number | string)) {
    this.comparator = new BetweenComparator(lowOperand, highOperand);
    return this;
  }

  in(operands: (string | boolean | number | Condition)[]) {
    this.comparator = new InComparator(operands);
    return this;
  }

  exists() {
    this.comparator = new ExistsComparator();
    return this;
  }

  type(type: ('S' | 'SS' | 'N' | 'NS' | 'B' | 'BS' | 'BOOL' | 'NULL' | 'L' | 'M')) {
    this.comparator = new TypeComparator(type);
    return this;
  }

  contains(operand: string) {
    this.comparator = new ContainsComparator(operand);
    return this;
  }

  beginsWith(substring: string) {
    this.comparator = new BeginsWithComparator(substring);
    return this;
  }
}

export class ConditionError extends Error {}
